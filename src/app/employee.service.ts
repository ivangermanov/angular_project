import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { EMPLOYEES } from './mock-employees';
import { Observable, of } from 'rxjs';
import { DepartmentService} from './department.service';


import { EmployeeService } from './employee.service';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employees$: Observable<Employee[]>;
  private employeesUrl = "http://localhost/api/employee";

//changed for the web app
  getEmployees(): Observable<Employee[]> {

    return this._http
      .get(`${this.employeesUrl}/read.php`)
      .pipe(map((res:Response) => res.json()));
  }
//changed for the web app
  add(newdep: Employee): Observable<Employee> {
    EMPLOYEES.push(newdep);
    return of(newdep);
  }
//changed for the web app

  addEmployee(employee: Employee): Observable<Employee> {
    EMPLOYEES.push(employee);
    this.employees$ = of(EMPLOYEES);
    return of(employee);
  }

  getEmployee(id: number): Observable<Employee> {
    return of(EMPLOYEES.find(employee => employee.id === id));
  }



  searchEmployees(term: string): Observable<Employee[]> {
    if(!term.trim()) {
      return of([]);
    }
    return this._http
      .get(`${this.employeesUrl}/search.php?s=` + term)
      .pipe(map((res:Response) => res.json()));
  }


  deleteEmployee(employee: Employee): Observable<Employee> {
    EMPLOYEES.splice(EMPLOYEES.indexOf(employee), 1);
    this.employees$ = of(EMPLOYEES);
    return of(employee);
  }

  constructor(
    private employeeService: EmployeeService,
    private _http: Http
  ) { }
}
