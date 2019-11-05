import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RegisterComponent} from './core/signup/signup.component';
import {LoginComponent} from './core/login/login.component';
import { HomeComponent } from './home/home.component';
import {AuthGuard} from './auth.guard';
const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'register', component:RegisterComponent,canActivate:[AuthGuard]},
  {path:'login', component:LoginComponent}
];

@NgModule({
  
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, RegisterComponent,HomeComponent];