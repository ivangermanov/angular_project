import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { Department } from '../department';

import { EmployeeService } from '../employee.service';
import { DepartmentService } from '../department.service';
import { NgbDateStruct, NgbCalendar, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  date: { year: number, month: number, day: number };

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
    this.employeeService.getEmployees().subscribe(employees => {
      for (let i = 0; i < employees["records"].length; i++) {
        this.departmentService.getDepartment(employees["records"][i]["department_id"]).subscribe(department => {
          return employees["records"][i].department = department;
        });

        employees["records"][i] = new Employee(employees["records"][i].id, employees["records"][i].name, employees["records"][i].telephone,
          employees["records"][i].doh, employees["records"][i].department);
      }

      this.employees = employees["records"];
    });
  }

  getDepartments(): void {
    this.departmentService.getDepartments().subscribe(departments => this.departments = departments["records"])
  }

  delete(employee: Employee): void {
    this.employees = this.employees.filter(e => e !== employee);
    this.employeeService.deleteEmployee(employee).subscribe();
  }

  constructor(
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    config: NgbDatepickerConfig
  ) {
    let date = new Date();
    config.maxDate = { year: date.getFullYear(), month: date.getMonth() + 2, day: date.getDate() };
  }

  ngOnInit() {
    this.getEmployees();
    this.getDepartments();
  }
}
