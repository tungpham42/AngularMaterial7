import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes }  from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BmiComponent } from './bmi/bmi.component';

const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'bmi', component: BmiComponent},  
  {path: '', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes),
    CommonModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
