import { Component, OnInit } from '@angular/core';

import{Department} from '../department';
import { DEPARTMENTS} from '../mock-departments';
@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.css']
})
export class DepartmentsComponent implements OnInit {
  

  departments = DEPARTMENTS;
 
  constructor() { }

  ngOnInit() {
  }
  
  selectedDepartment: Department; 

  onSelect(department: Department): void {
    this.selectedDepartment = department;
  }

add(name: string, role: string) {
  let id; 
  if(this.departments.length > 0) 
  {
    id = this.departments[this.departments.length -1].id + 1; 
  }
  else 
  {
    id = 1; 
  }
  DEPARTMENTS.push(new Department(id, name, role));
}

delete(dep: Department) {
  this.departments = this.departments.filter(department => department !==dep ); 

}
}
