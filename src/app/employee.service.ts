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

addEmployee (employee: Employee): Observable<Employee> {
  return of(employee);
}


  deleteEmployee (employee: Employee): Observable<Employee> {
    const id = typeof employee === 'number' ? employee : employee.id;
    const index = EMPLOYEES.indexOf(employee);
    EMPLOYEES.splice(index);
    return of(employee);
  }
  constructor() { }
}
