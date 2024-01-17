import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { FoodsComponent } from './pages/foods/foods.component';
import { LoginComponent } from './navbar/login/login.component';
import { SignupComponent } from './navbar/signup/signup.component';
import { FoodpageComponent } from './pages/foodpage/foodpage.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PagenotfoundComponent } from './pages/pagenotfound/pagenotfound.component';

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {path:'foods',component:FoodsComponent},
  { path: 'edit/:foodid',  component: FoodsComponent  },
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'foodpage',component:FoodpageComponent},
  {path:'dashboard',component:DashboardComponent},


     //Wild Card Route for 404 request 
     { path: '**', pathMatch: 'full',  
     component: PagenotfoundComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
