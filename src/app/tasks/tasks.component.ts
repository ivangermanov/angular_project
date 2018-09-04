import { Component, OnInit } from '@angular/core';
import { Task } from '../task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  private selectedTask: number;

  tasks = [
    new Task(1, 'Task1'),
    new Task(2, 'Task2'),
    new Task(3, 'Task3'),
    new Task(4, 'Task4'),
    new Task(5, 'Task5'),
    new Task(6, 'Task6'),
    new Task(7, 'Task7')
  ];

  selectTask(id: number) {
    this.selectedTask = id;
    console.log(this.selectedTask);
  }

  constructor() { }

  ngOnInit() {
  }

}
