import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { EMPLOYEES } from './mock-employees';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  getEmployees(): Employee[] {
    return EMPLOYEES;
  }


  getEmployee(id: number): Observable<Employee> {
    return of(EMPLOYEES.find(employee => employee.id === id));
  }

  addEmployee (employee: Employee): Observable<Employee> {
    EMPLOYEES.push(employee);
    return of(employee);
  }
//
  deleteEmployee(employee: Employee): Observable<Employee> {
    EMPLOYEES.splice(EMPLOYEES.indexOf(employee) 1);
    return of(employee);
  }
  constructor() { }
}
