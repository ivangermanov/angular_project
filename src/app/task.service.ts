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
    return of(task);
  }

  deleteTask (task: Task): Observable<Task> {
    const index = TASKS.indexOf(task);
    TASKS.splice(index, 1);
    return of(task);
  }
  constructor() { }
}
