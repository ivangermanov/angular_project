import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import { DepartmentsComponent } from './departments/departments.component';
import { EmployeesComponent } from './employees/employees.component';
import { TaskDetailComponent } from './task-detail/task-detail.component';
import { DepartmentDetailComponent } from './departments-detail/departments-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './/app-routing.module';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { TaskSearchComponent } from './task-search/task-search.component';
import { DepartmentSearchComponent } from './department-search/department-search.component';
import { EmployeeSearchComponent } from './employee-search/employee-search.component';


@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    DepartmentsComponent,
    EmployeesComponent,
    TaskDetailComponent,
    DepartmentDetailComponent,
    DashboardComponent,
    EmployeeDetailComponent,
    TaskSearchComponent,
    DepartmentSearchComponent,
    EmployeeSearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
