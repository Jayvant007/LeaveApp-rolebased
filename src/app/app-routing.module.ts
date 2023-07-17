import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { StuffComponent } from './stuff/stuff.component';
import { HodComponent } from './hod/hod.component';
import { isGuard } from './shared/services/http-authguard.service';
import { StuffDetailsComponent } from './hod/stuff-details/stuff-details.component';

const routes: Routes = [
  {path:'log' , component : LoginComponent},
  {path:'reg' , component : RegisterComponent},
  {path:'stuff', component : StuffComponent , canActivate : [isGuard]},
  {path:'hod',component:HodComponent ,
    canActivate : [isGuard] , 
   },
  {path:'stuff-details', component : StuffDetailsComponent ,  canActivate : [isGuard] },
  {path:'**',redirectTo : '/log'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
