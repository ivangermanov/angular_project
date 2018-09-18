import { Component, OnInit } from '@angular/core';

import { Department } from '../department';
//import { DEPARTMENTS } from '../mock-departments';

import { DepartmentService} from '../department.service';
@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {


  //departments = DEPARTMENTS;
  departments: Department[]; 

  constructor(private departmentService: DepartmentService) { }

  ngOnInit() {
    this.getDepartments();
  }
    
  selectedDepartment: Department;

  getDepartments(): void {
    //this.departments = this.departmentService.getDepartments();
    this.departmentService.getDepartments().subscribe(departments => this.departments = departments);
  }
   
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
   // DEPARTMENTS.push(new Department(id, name, role)); old version
   let newdep = new Department(id, name, role);
   this.departmentService.add(newdep).subscribe(() => {this.getDepartments();})
  }

  delete(dep: Department) {
    this.departmentService.delete(dep).subscribe(() => {this.getDepartments();})
  }
}
