import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { Department } from './department';
import { DEPARTMENTS } from './mock-departments';
import { Observable, of } from 'rxjs';
import { EmployeeService } from './employee.service';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
 
  private departmentsUrl = "http://localhost/api/department";
  constructor(
    private employeeService: EmployeeService,
    private _http: Http) { }

  getDepartment(id: number): Observable<Department> {
    return of(DEPARTMENTS.find(department => department.id === id));
  }

  getDepartments():Observable<Department[]> {
    //return DEPARTMENTS;
    return this._http 
      .get(`${this.departmentsUrl}/read.php`)
      .pipe(map((res:Response) => res.json()));
  }

  add(newdep: Department): Observable<Department> {
    DEPARTMENTS.push(newdep);
    return of(newdep);
  }

  getEmployees(department: Department): Employee[] {
    let allEmployees = this.employeeService.getEmployees();
    let employees = Array<Employee>();
    allEmployees.forEach(employee => {
      if (employee.department.id === department.id) {
        employees.push(employee);
      }
    });
    console.log(employees);
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

  searchDepartments(term: string): Observable<Department[]> {
    if(!term.trim()) {
      return of([]);
    }
    return this._http 
      .get(`${this.departmentsUrl}/search.php?s=` + term)
      .pipe(map((res:Response) => res.json()));
  }
}
