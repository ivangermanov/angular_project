import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Task } from './task';
import { Employee } from './employee';

import { DepartmentService } from './department.service';
import { EmployeeService } from './employee.service';
import { Department } from './department';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  getTask(id: number): Observable<Task> {
    return this._http
      .get("http://localhost/api/tasks/read_one.php?id=" + id)
      .pipe(map((res: Response) => res.json()));
  }

  getTasks(): Observable<Task[]> {
    return this._http
      .get("http://localhost/api/tasks/read.php")
      .pipe(map((res: Response) => res.json()));
  }

  addTask(task: Task): Observable<Task> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let jsonTask = this.jsonifyTask(task);

    return this._http.post(
      "http://localhost/api/tasks/create.php",
      jsonTask,
      options
    ).pipe(map((res: Response) => {
      if (res.ok) {
        return of(task);
      } else {
        return res.json();
      }
    }));
  }

  deleteTask(task: Task): Observable<Task> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post(
      "http://localhost/api/tasks/delete.php",
      { id: task.id },
      options
    ).pipe(map((res: Response) => res.json()));
  }

  updateTask(task: Task): Observable<Task> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let jsonTask = this.jsonifyTask(task);
    
    return this._http.post(
      "http://localhost/api/tasks/update.php",
      jsonTask,
      options
    ).pipe(map((res: Response) => {
      if (res.ok) {
        return of(task);
      } else {
        return res.json();
      }
    }));
  }

  decodeTask(task: Task): Task {
    const id = task["id"];
    let departmentObj: Department;
    this.departmentService.getDepartment(task["department_id"]).subscribe(department => departmentObj = department);
    
    const employees = new Array<Employee>();
    for (let j = 0; j < task["employee_id"].length; j++) {
      this.employeeService.getEmployee(task["employee_id"][j]).subscribe(employee => employees.push(employee));
    }
    const name_task = task["name_task"];
    const reason = task["reason"];
    const dueDate = task["due_date"];
    return new Task(id, name_task, reason, dueDate, employees, departmentObj);
  }

  decodeTasks(tasks: Task[]): Task[] {
    let decoded_tasks = new Array<Task>();
    for (let i = 0; i < tasks["records"].length; i++) {
      const id = tasks["records"][i]["id"];
      let departmentObj: Department;
      this.departmentService.getDepartment(tasks["department_id"]).subscribe(department => departmentObj = department);
      const employees = new Array<Employee>();
      for (let j = 0; j < tasks["records"][i]["employee_id"].length; j++) {
        this.employeeService.getEmployee(tasks["records"][i]["employee_id"][j]).subscribe(employee => employees.push(employee));
      }
      const name_task = tasks["records"][i]["name_task"];
      const reason = tasks["records"][i]["reason"];
      const dueDate = tasks["records"][i]["due_date"];
      decoded_tasks.push(new Task(id, name_task, reason, dueDate, employees, departmentObj));
    }

    return decoded_tasks;
  }

  jsonifyTask(task: Task): object {
    let employee_ids = new Array<number>();
    task.employees.forEach(employee => {
      employee_ids.push(employee.id);
    });
    let jsonTask = {
      "id": task.id, "department_id": task.department.id, "name_task": task.name, "reason": task.reason,
      "due_date": task.dueDate, "employee_id": employee_ids
    };

    return jsonTask;
  }

  constructor(
    private _http: Http,
    private departmentService: DepartmentService,
    private employeeService: EmployeeService) { }
}
