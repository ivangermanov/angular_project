import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { EMPLOYEES } from './mock-employees';
import { Observable, of } from 'rxjs';
import { DepartmentService} from './department.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {


  getEmployees(): Employee[] {
    return EMPLOYEES;
  }

getDepartmentName(id:number): string{
  depName='name';
  return of( this.departmentService.getDepartment(id).name);
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
  constructor(private departmentService: DepartmentService) { }
}
