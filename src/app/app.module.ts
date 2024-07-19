import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './page/login/login.component';
import { AdmindashComponent } from './admindash/admindash.component';
import { AddcordinatorComponent } from './admindash/addcordinator/addcordinator.component';
import { CordinatorsComponent } from './admindash/cordinators/cordinators.component';
import { AddnewclassComponent } from './admindash/addnewclass/addnewclass.component';
import { ReportsComponent } from './admindash/reports/reports.component';
import { FooterComponent } from './footer/footer.component';
import { AvailableclassComponent } from './admindash/availableclass/availableclass.component';
import { RequestComponent } from './admindash/request/request.component';
import { TimetableComponent } from './admindash/timetable/timetable.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ViewclassComponent } from './admindash/viewclass/viewclass.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    AdmindashComponent,
    AddcordinatorComponent,
    CordinatorsComponent,
    AddnewclassComponent,
    ReportsComponent,
    FooterComponent,
    AvailableclassComponent,
    RequestComponent,
    TimetableComponent,
    ViewclassComponent ,
    
   
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
