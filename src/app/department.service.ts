import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { Department } from './department';
import { DEPARTMENTS } from './mock-departments';
import { Observable, of } from 'rxjs';
import { EmployeeService } from './employee.service';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private employeeService: EmployeeService) { }

  getDepartment(id: number): Observable<Department> {
    return of(DEPARTMENTS.find(department => department.id === id));
  }

  getDepartments(): Department[] {
    return DEPARTMENTS;
  }

  add(newdep: Department): Observable<Department> {
    DEPARTMENTS.push(newdep);
    return of(newdep);
  }

  getEmployees(department: Department): Employee[] {
    let allEmployees = this.employeeService.getEmployees();
    let employees = Array<Employee>();
    allEmployees.forEach(employee => {
      if (employee.department === department) {
        employees.push(employee);
      }
    });

    return employees;
  }
//added by vlad for displaying dep in emp detail
//  getDepartment(id: number): Observable<Department> {
  //  return of(DEPARTMENTS.find(department => department.id === id));
  //}
//
  delete(dep: Department): Observable<Department> {
    DEPARTMENTS.splice(DEPARTMENTS.indexOf(dep), 1);
    return of(dep);
  }
}
