import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { EMPLOYEES } from './mock-employees';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employees$: Observable<Employee[]>;

  getEmployees(): Employee[] {
    this.employees$ = of(EMPLOYEES);
    return EMPLOYEES;
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return of(employee);
  }


  deleteEmployee(employee: Employee): Observable<Employee> {
    const index = EMPLOYEES.indexOf(employee);
    EMPLOYEES.splice(index, 1);
    return of(employee);
  }

  constructor() { }
}
