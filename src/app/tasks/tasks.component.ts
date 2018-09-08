import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TASKS } from '../mock-tasks'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  selectedTask: Task;

  tasks = TASKS;

  selectTask(task: Task) {
    this.selectedTask = task;
  }

  constructor() { }

  ngOnInit() {
  }

}
