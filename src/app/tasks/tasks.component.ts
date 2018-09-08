import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { TASKS } from '../mock-tasks'
import { TaskService } from '../task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  selectedTask: Task;

  tasks: Task[];

  selectTask(task: Task) {
    this.selectedTask = task;
  }

  add(name: string, reason: string, minutes: number): void {
    name = name.trim();
    if (!name) { return; }
    const id = this.tasks[this.tasks.length - 1].id + 1;
    this.taskService.addTask({id, name, reason, minutes} as Task).subscribe(task => { this.tasks.push(task); });
  }

  delete(task: Task): void {
    this.tasks = this.tasks.filter(t => t !== task);
    this.taskService.deleteTask(task).subscribe();
  }

  getTasks(): void {
    this.tasks = this.taskService.getTasks();
  }

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.getTasks();
  }

}
