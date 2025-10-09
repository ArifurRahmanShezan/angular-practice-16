import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentComponent } from './student/student.component';
import { CitycardComponent } from './citycard/citycard.component';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';
import {HttpClientModule} from '@angular/common/http';
import { UserComponent } from './user/user.component';



@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    StudentComponent,
    CitycardComponent,
    HomeComponent,
    TestComponent,
    UserComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
