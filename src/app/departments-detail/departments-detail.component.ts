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

  async ngOnInit() {
    await this.getDepartment();
    await this.getEmployees();
  }

  async getDepartment(): Promise<Department> {
    const id = +this.route.snapshot.paramMap.get('id');
    let department = await this.departmentService.getDepartment(id).toPromise();
    const newDepartment = new Department(department["id"], department["name_department"], department["role"]);
    return this.department = newDepartment;
  }

  async getEmployees(): Promise<Employee[]> {
    return await this.employeeService.getEmployeesOfDepartment(this.department).toPromise()
      .then(employees => this.employees = employees["records"]);
  }

  updateDepartment(): void {
    this.departmentService.updateDepartment(this.department).subscribe(() => this.getDepartment());
  }

  goBack(): void {
    this.location.back();
  }

}
