import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { Department } from '../department';

import { EmployeeService } from '../employee.service';
import { DepartmentService } from '../department.service';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

public model: any;

  employees: Employee[];
  departments: Department[];

  selectedEmployee: Employee;
  selectedDepartment: Department;

  onSelect(employee: Employee): void {
    this.selectedEmployee = employee;
  }

  add(name: string, tel: string, doh: string, department: Department): void {
    name = name.trim();
    if (!name || !department) { return; }
    let id: number;
    if (this.employees.length != 0) {
      id = this.employees[this.employees.length - 1].id + 1;
    } else {
      id = 1;
    }
    let newEmployee = new Employee(id, name, tel, doh, department);
    this.employeeService.addEmployee(newEmployee).subscribe(() => { this.getEmployees(); });
  }

  selectDepartment(department: Department) {
    this.selectedDepartment = department;
  }

  getEmployees(): void {
    this.employees = this.employeeService.getEmployees();
  }

  getDepartments(): void {
    this.departmentService.getDepartments().subscribe((departments)=> this.departments =departments) 
  }

  delete(employee: Employee): void {
    this.employees = this.employees.filter(e => e !== employee);
    this.employeeService.deleteEmployee(employee).subscribe();
  }

  constructor(private employeeService: EmployeeService, private departmentService: DepartmentService) { }

  ngOnInit() {
    this.getEmployees();
    this.getDepartments();
  }
}
