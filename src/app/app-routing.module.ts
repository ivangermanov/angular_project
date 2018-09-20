import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentsComponent } from './departments/departments.component';
import { EmployeesComponent } from './employees/employees.component';
import { TasksComponent } from './tasks/tasks.component';
import { DashboardComponent }   from './dashboard/dashboard.component';
import { TaskDetailComponent }  from './task-detail/task-detail.component';
import { EmployeeDetailComponent }  from './employee-detail/employee-detail.component';

const routes: Routes = [
  { path: 'departments', component: DepartmentsComponent },
  { path: 'employees', component: EmployeesComponent},
  { path: 'tasks', component: TasksComponent},
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/tasks/:id', component: TaskDetailComponent },
  { path: 'detail/:id', component: EmployeeDetailComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
