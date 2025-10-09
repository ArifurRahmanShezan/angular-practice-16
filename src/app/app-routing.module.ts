import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { StudentComponent } from './student/student.component';
import { CitycardComponent } from './citycard/citycard.component';
import { HomeComponent } from './home/home.component';
import { TestComponent } from './test/test.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  {
    path:'employee',component:EmployeeComponent,
  },
  {
    path:'student',component:StudentComponent
  },
  {
    path:'citycard',component:CitycardComponent
  },
  {
    path:'home',component:HomeComponent
  },
  {
    path:'test',component:TestComponent
  },
  {
    path:'user', component:UserComponent
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
