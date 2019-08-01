import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MatAutocompleteModule, MatInputModule, MatCheckboxModule, MatDatepickerModule, MatNativeDateModule, MatOptionModule, MatSelectModule, MatIconModule, MatRadioModule, MatSliderModule, MatSlideToggleModule, MatMenuModule, MatButtonModule, MatSidenavModule, MatToolbarModule, MatCardModule, MatDividerModule, MatListModule, MatExpansionModule, MatGridListModule, MatStepperModule, MatTabsModule, MatTreeModule, MatButtonToggleModule, MatBadgeModule, MatChipsModule, MatProgressSpinnerModule, MatProgressBarModule, MatRippleModule, MatSnackBarModule, MatTooltipModule, MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BMIComponent} from './bmi/bmi.component';

const appRoutes: Routes = [
  { path: '', component: AppComponent },
  { path: 'bmi', component: BMIComponent }
]

@NgModule({
  declarations: [
    AppComponent,
    BMIComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule, MatCheckboxModule, MatExpansionModule,
    MatDatepickerModule, MatNativeDateModule,
    MatOptionModule, MatSelectModule, MatIconModule, MatRadioModule, MatButtonToggleModule,
    MatSliderModule, MatSlideToggleModule,
    MatMenuModule, MatButtonModule, MatStepperModule,
    MatSidenavModule,
    MatToolbarModule,
    MatCardModule,
    MatDividerModule, MatListModule,
    MatGridListModule,
    MatTabsModule,
    MatTreeModule,
    MatBadgeModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatRippleModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatSortModule, MatTableModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [ RouterModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
