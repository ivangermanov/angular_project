import { Component, OnInit } from '@angular/core';
import { Task } from '../task';
import { Department } from '../department';
import { Employee } from '../employee';

import { TaskService } from '../task.service';
import { DepartmentService } from '../department.service';
import { EmployeeService } from '../employee.service';

import { NgbDateStruct, NgbCalendar, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
  providers: [NgbDatepickerConfig]
})
export class TasksComponent implements OnInit {

  date: { year: number, month: number, day: number };
  selectedEmployees: Employee[];
  selectedDepartment: Department;
  tasks: Task[];
  employees: Employee[];
  departments: Department[];

  selectEmployees(employees: Employee[]) {
    this.selectedEmployees = employees;
  }

  selectDepartment(department: Department) {
    this.selectedDepartment = department;
    this.getEmployees();
  }

  add(name: string, reason: string, dueDate: string, employees: Employee[], department: Department): void {
    name = name.trim();
    if (!name || !employees || !department) { return; }
    let id;
    if (this.tasks.length != 0) {
      id = this.tasks[this.tasks.length - 1].id + 1;
    } else {
      id = 1;
    }
    let newTask = new Task(id, name, reason, dueDate, employees, department);
    this.taskService.addTask(newTask).subscribe(() => { this.getTasks(); });
  }

  delete(task: Task): void {
    this.taskService.deleteTask(task).subscribe(() => { this.getTasks(); });
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = this.taskService.decodeTasks(tasks);
    })
  }

  getEmployees(): void {
    this.employeeService.getEmployeesOfDepartment(this.selectedDepartment).subscribe(employees => {
      if (employees.hasOwnProperty('records')) {
        for (let i = 0; i < employees["records"].length; i++) {
          this.departmentService.getDepartment(employees["records"][i]["department_id"]).subscribe(department => {
            return employees["records"][i].department = department;
          });
          
          employees["records"][i] = new Employee(employees["records"][i].id, employees["records"][i].name, employees["records"][i].telephone,
          employees["records"][i].doh, employees["records"][i].department);
        }
        
        this.employees = employees["records"]; 
      } else {
        this.employees = new Array<Employee>();
      }
    });
  }

  getDepartments(): void {
    this.departmentService.getDepartments().subscribe((departments)=> this.departments = departments["records"])
  }

  constructor(
    private taskService: TaskService,
    private departmentService: DepartmentService,
    private employeeService: EmployeeService,
    config: NgbDatepickerConfig
  ) {
    let date = new Date();
    config.minDate = {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate()};
  }

  ngOnInit() {
    this.getTasks();
    this.getDepartments();
  }

}
