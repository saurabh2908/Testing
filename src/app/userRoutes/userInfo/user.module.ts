import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './about.component';

import {RouterModule, Routes} from '@angular/router';
import {EducationComponent} from './education.component'
import { MyGuard } from '../../myguard';
 import { BackEnd } from '../../backend.service';


const routes:Routes = [
  

  {path:'about',
  // canActivate:[MyGuard],
  component:AboutComponent},
  {path:'edu',
  component:EducationComponent}
];
@NgModule({
  declarations: [ AboutComponent,EducationComponent],
  imports: [
    CommonModule,RouterModule.forRoot(routes),ReactiveFormsModule, FormsModule
  ],

  providers:[MyGuard,BackEnd],
  exports:[RouterModule]
})
export class UserroutesModule { }