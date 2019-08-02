import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from "@angular/forms";
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {BehaviorSubject, Observable, of as observableOf} from 'rxjs';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatSnackBar, Sort } from "@angular/material";

export class FileNode {
  children: FileNode[];
  filename: string;
  type: any;
}

export class FileFlatNode {
  constructor(
    public expandable: boolean, public filename: string, public level: number, public type: any) {}
}

const TREE_DATA = JSON.stringify({
  Documents: {
     angular: {
        src: {
          compiler: 'ts',
          core: 'ts'
        }
     },
     material2: {
        src: {
          button: 'ts',
          checkbox: 'ts',
          input: 'ts'
        }
     }
  }
});

@Injectable()
export class FileDatabase {
  dataChange = new BehaviorSubject<FileNode[]>([]);
  get data(): FileNode[] { return this.dataChange.value; }
  constructor() {
    this.initialize();
  }
  initialize() {
    const dataObject = JSON.parse(TREE_DATA);   
    const data = this.buildFileTree(dataObject, 0);
    this.dataChange.next(data);
  } 
  buildFileTree(obj: {[key: string]: any}, level: number): FileNode[] {
    return Object.keys(obj).reduce<FileNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new FileNode();
      node.filename = key;
      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.type = value;
        }
      }
      return accumulator.concat(node);
    }, []);
  }
}

export interface Food {
  value: string;
  display: string;
  calories: number;
  carbs: number;
  fat: number;
  protein: number;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [FileDatabase]
})
export class HomeComponent implements OnInit {
  title = 'bmi';
  myControl = new FormControl();

  states: { value: string; display: string; }[];

  firstChecked = false;
  firstDisabled = false;
  indeterminate = false;
  labelPosition = 'before';

  emailFormControl = new  FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  favoriteSeason: string;
  seasons: string[] = ['Spring', 'Summer', 'Fall', 'Winter'];

  selectedValue: string;
  
  foods: Food[] = [
    {display: 'Yogurt', value: 'yogurt', calories: 159, fat: 6, carbs: 24, protein: 4},
    {display: 'Sandwich', value: 'sandwich', calories: 237, fat: 9, carbs: 37, protein: 4},
    {display: 'Eclairs', value: 'eclairs', calories: 262, fat: 16, carbs: 24, protein: 6},
    {display: 'Cupcakes', value: 'cupcakes', calories: 305, fat: 4, carbs: 67, protein: 4},
    {display: 'Gingerbreads', value: 'gingerbreads', calories: 356, fat: 16, carbs: 49, protein: 4},
  ];
  sortedFood: Food[];

  displayedColumns: string[] = ['display', 'calories', 'fat', 'carbs', 'protein'];

  secondDisabled = false;

  thirdChecked = false;
  thirdDisabled = false;
  invert = false;
  thumbLabel = false;
  value = 0;
  vertical = false;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  
  treeControl: FlatTreeControl<FileFlatNode>;
  treeFlattener: MatTreeFlattener<FileNode, FileFlatNode>;
  dataSource: MatTreeFlatDataSource<FileNode, FileFlatNode>;

  spinnerColor = "primary";
  spinnerMode = "determinate";
  spinnerValue = 50;

  barColor = "primary";
  barMode = "determinate";
  barValue = 50;
  barBufferValue = 75;

  rippleCentered = false;
  rippleDisabled = false;
  rippleUnbounded = false;
  rippleRadius: number;
  rippleColor: string;

  constructor(private _formBuilder: FormBuilder, database: FileDatabase, public snackBar: MatSnackBar){
    this.treeFlattener = new MatTreeFlattener(this.transformer, this._getLevel,
    this._isExpandable, this._getChildren);
    this.treeControl = new FlatTreeControl<FileFlatNode>(this._getLevel, this._isExpandable);
    this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
    database.dataChange.subscribe(data => this.dataSource.data = data);
    this.loadStates();
    this.sortedFood = this.foods.slice();
  }
  transformer = (node: FileNode, level: number) => {
    return new FileFlatNode(!!node.children, node.filename, level, node.type);
  }
  private _getLevel = (node: FileFlatNode) => node.level;
  private _isExpandable = (node: FileFlatNode) => node.expandable;
  private _getChildren = (node: FileNode): Observable<FileNode[]> => observableOf(node.children);
  hasChild = (_: number, _nodeData: FileFlatNode) => _nodeData.expandable;
  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  } 
  loadStates() {
    var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
    Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
    Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
    Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
    North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
    South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
    Wisconsin, Wyoming';
    this.states = allStates.split(/, +/g).map(function(state){
      return {
        value: state.toUpperCase(),
        display: state
      };
    });
  }
  sortFood(sort: Sort) {
    const data = this.foods.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedFood = data;
      return;
    }
    this.sortedFood = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'name': return compare(a.value, b.value, isAsc);
        case 'calories': return compare(a.calories, b.calories, isAsc);
        case 'fat': return compare(a.fat, b.fat, isAsc);
        case 'carbs': return compare(a.carbs, b.carbs, isAsc);
        case 'protein': return compare(a.protein, b.protein, isAsc);
        default: return 0;
      } 
    });
  }
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
