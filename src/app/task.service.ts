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
    const id = typeof task === 'number' ? task : task.id;
    const index = TASKS.indexOf(task);
    TASKS.splice(index);
    return of(task);
  }
  constructor() { }
}
