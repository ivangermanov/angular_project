import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { EMPLOYEES } from './mock-employees';
import { Observable, of } from 'rxjs';
import { DepartmentService} from './department.service';

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
    EMPLOYEES.push(employee);
    this.employees$ = of(EMPLOYEES);
    return of(employee);
  }

  getEmployee(id: number): Observable<Employee> {
    return of(EMPLOYEES.find(employee => employee.id === id));
  }


  deleteEmployee(employee: Employee): Observable<Employee> {
    EMPLOYEES.splice(EMPLOYEES.indexOf(employee), 1);
    this.employees$ = of(EMPLOYEES);
    return of(employee);
  }

  constructor() { }
}
