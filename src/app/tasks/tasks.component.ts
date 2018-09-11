import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { Department } from '../department';
import { Employee } from '../employee';

import { TaskService } from '../task.service';
//TODO: change after DEPARTMENTS gets a service
import { DEPARTMENTS } from '../mock-departments';
//TODO: change after EMPLOYEES gets a service
import { EMPLOYEES } from '../mock-employees';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  selectedTask: Task;
  selectedEmployees: Employee[];
  selectedDepartment: Department;
  tasks: Task[];

  //TODO: change after DEPARTMENTS gets a service
  departments = DEPARTMENTS;
  //TODO: change after DEPARTMENTS gets a service
  employees = EMPLOYEES;

  selectTask(task: Task) {
    this.selectedTask = task;
  }

  selectEmployees(employees: Employee[]) {
    this.selectedEmployees = employees;
  }

  selectDepartment(department: Department) {
    this.selectedDepartment = department;
  }

  add(name: string, reason: string, minutes: number, employees: Employee[], department: Department): void {
    console.log(this.selectedTask);
    
    name = name.trim();
    if (!name) { return; }
    let id;
    if (this.tasks.length != 0) {
      id = this.tasks[this.tasks.length - 1].id + 1;
    } else {
      id = 1;
    }
    let newTask = new Task(id, name, reason, minutes, employees, department);
    this.taskService.addTask(newTask).subscribe(task => { this.tasks.push(task); });
  }

  delete(task: Task): void {
    this.tasks = this.tasks.filter(t => t !== task);
    this.taskService.deleteTask(task).subscribe();
  }

  getTasks(): void {
    this.tasks = this.taskService.getTasks();
  }

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
    this.getTasks();
  }

}
