import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';

import { Employee } from '../employee'
import { EmployeeService } from '../employee.service';
import { DepartmentService } from '../department.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

  @Input() employee: Employee;
  depName: string;

  constructor(private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private location: Location,
    private departmentService: DepartmentService
  ) { }
  ngOnInit(): void {
    this.getEmployee();
  }

  async getEmployee(): Promise<Employee> {
    const id = +this.route.snapshot.paramMap.get('id');
    let employee = await this.employeeService.getEmployee(id).toPromise();
    employee.department = await this.departmentService.getDepartment(employee["department_id"]).toPromise();
    const newEmployee = new Employee(employee["id"], employee["name_employee"], employee["telephone"], employee["doh"], employee['department']);
    
    return this.employee = newEmployee;
  }

  updateEmployee(): void {
    this.employeeService.updateEmployee(this.employee).subscribe(() => this.getEmployee());
  }

  goBack(): void {
    this.location.back();
  }

}
