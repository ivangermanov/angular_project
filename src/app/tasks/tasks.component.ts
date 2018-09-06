import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TASKS } from '../mock-tasks'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  private selectedTask: number;

  tasks = TASKS;

  selectTask(id: number) {
    this.selectedTask = id;
    console.log(this.selectedTask);
  }

  constructor() { }

  ngOnInit() {
  }

}
