import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { TASKS } from './mock-tasks';
import { Task } from './task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  getTasks(): Task[] {
    return TASKS;
  }

  addTask (task: Task): Observable<Task> {
    TASKS.push(task);
    return of(task);
  }

  deleteTask (task: Task): Observable<Task> {
    TASKS.splice(TASKS.indexOf(task), 1);
    return of(task);
  }
  constructor() { }
}