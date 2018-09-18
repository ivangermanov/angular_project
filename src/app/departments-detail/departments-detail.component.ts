import {Component, OnInit, Input} from '@angular/core';
import { Department } from '../department';
@Component({
  selector: 'app-departments-detail',
  templateUrl: './departments-detail.component.html',
  styleUrls: ['./departments-detail.component.css']
})

export class DepartmentsDetailComponent implements OnInit {
  
  @Input() department: Department;
  
  constructor() { }

  ngOnInit() {
  }

}
