import { Component, OnInit } from '@angular/core';
import { ComponentLink } from '../component-link';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  components = new Array<ComponentLink>(
    new ComponentLink('Tasks', '/tasks'),
    new ComponentLink('Employees', '/employees'),
    new ComponentLink('Departments', '/departments')
    );
 
  ngOnInit() {
  }
}