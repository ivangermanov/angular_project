import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { Department } from '../department';
import { Employee } from '../employee';

import { TaskService } from '../task.service';
import { DepartmentService } from '../department.service';
import { EmployeeService } from '../employee.service';

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
  employees: Employee[];
  departments: Department[];

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
    name = name.trim();
    if (!name) { return; }
    let id;
    if (this.tasks.length != 0) {
      id = this.tasks[this.tasks.length - 1].id + 1;
    } else {
      id = 1;
    }
    let newTask = new Task(id, name, reason, minutes, employees, department);
    this.taskService.addTask(newTask).subscribe(() => { this.getTasks(); });
  }

  delete(task: Task): void {
    this.taskService.deleteTask(task).subscribe(() => { this.getTasks(); });
  }

  getTasks(): void {
    this.tasks = this.taskService.getTasks();
  }

  getEmployees(): void {
    this.employees = this.employeeService.getEmployees();
  }

  getDepartments(): void {
    this.departments = this.departmentService.getDepartments();
  }

  constructor(
    private taskService: TaskService,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService) {
  }

  ngOnInit() {
    this.getTasks();
    this.getEmployees();
    this.getDepartments();
    this.employeeService.employees$.subscribe(employees => {
      this.employees = employees;
    })
  }

}
