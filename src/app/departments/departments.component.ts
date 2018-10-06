import { Component, OnInit } from '@angular/core';

import { Department } from '../department';
import { Employee } from '../employee';

import { DepartmentService } from '../department.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {

  departments: Department[];
  employees: Employee[];

  constructor(private departmentService: DepartmentService
    , private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getDepartments();
    //this.getEmployees();
  }

  selectedDepartment: Department;

  getDepartments(): void {
    this.departmentService.getDepartments().subscribe((departments) => this.departments = departments["records"]);
  }

  //getEmployees(): void {
  //this.employees = this.employeeService.getEmployees();
  //}

  onSelect(department: Department): void {
    this.selectedDepartment = department;
  }

  add(name: string, role: string) {
    if (!name) { return; }
    let id;
    if (this.departments.length > 0) {
      id = this.departments[this.departments.length - 1].id + 1;
    }
    else {
      id = 1;
    }

    let newdep = new Department(id, name, role);
    this.departmentService.add(newdep).subscribe(() => { this.getDepartments(); })
  }

  delete(dep: Department) {
    this.departmentService.delete(dep).subscribe(() => { this.getDepartments(); })
  }
}
