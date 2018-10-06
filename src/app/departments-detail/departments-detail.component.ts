import { Component, OnInit, Input } from '@angular/core';
import { Department } from '../department';
import { Employee } from '../employee';
import { DepartmentService } from '../department.service';
import { EmployeeService } from '../employee.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-departments-detail',
  templateUrl: './departments-detail.component.html',
  styleUrls: ['./departments-detail.component.css']
})

export class DepartmentDetailComponent implements OnInit {

  @Input() department: Department;
  employees: Employee[];

  constructor(
    private route: ActivatedRoute,
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    private location: Location) { }

  ngOnInit() {
    this.getDepartment();
    this.getEmployees();
  }

  getDepartment(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.departmentService.getDepartment(id)
      .subscribe(department => this.department = department);
  }

  getEmployees(): void {
    this.employeeService.getEmployeesOfDepartment(this.department).subscribe(employees => this.employees = employees);
  }

  goBack(): void {
    this.location.back();
  }

}
