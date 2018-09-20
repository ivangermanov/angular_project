import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';

import {Employee  } from '../employee'
import {EmployeeService} from '../employee.service';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.css']
})
export class EmployeeDetailComponent implements OnInit {

@Input() employee: Employee;
depName:string;

  constructor(  private route: ActivatedRoute,
                private employeeService: EmployeeService,
                private location: Location
              ) {}
  ngOnInit():void{
      this.getEmployee();
  }

getEmployee(): void {
  const id = +this.route.snapshot.paramMap.get('id');
  this.employeeService.getEmployee(id)
    .subscribe(employee => this.employee = employee);
}
/*
getDepartment(): void {
  const id = +this.getEmployee().depId;
  this.employeeService.getDepartmentName(id)
    .subscribe(depName => this.depName = depName);
}*/

goBack(): void {
  this.location.back();
                }

}
