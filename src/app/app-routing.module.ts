import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './page/login/login.component';
import { AdmindashComponent } from './admindash/admindash.component';
import { AddcordinatorComponent } from './admindash/addcordinator/addcordinator.component';
import { CordinatorsComponent } from './admindash/cordinators/cordinators.component';
import { AddnewclassComponent } from './admindash/addnewclass/addnewclass.component';
import { ReportsComponent } from './admindash/reports/reports.component';
import { AvailableclassComponent } from './admindash/availableclass/availableclass.component';
import { RequestComponent } from './admindash/request/request.component';
import { TimetableComponent } from './admindash/timetable/timetable.component';
import { ViewclassComponent } from './admindash/viewclass/viewclass.component';


const routes: Routes = [
 {path:'',component:HomeComponent},
 {path:'login',component:LoginComponent},
 {path:'admindash',component:AdmindashComponent},
 {path:'addcordinator',component:AddcordinatorComponent},
 {path:'cordinators',component:CordinatorsComponent},
  {path:'reports',component:ReportsComponent},
 {path:'login',component:LoginComponent},
 {path:'login',component:LoginComponent},
 {path:'admindash',component:AdmindashComponent},
 {path:'admindash',component:AdmindashComponent},
 {path:'home',component:HomeComponent},
 {path:'availableclasses',component:AvailableclassComponent},
 {path:'request',component:RequestComponent},
 {path:'checktimetable',component:TimetableComponent},
 {path:'addnewclass',component:AddnewclassComponent},
 {path:'viewclass',component:ViewclassComponent}

 
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
