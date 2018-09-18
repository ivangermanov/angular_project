import { Injectable } from '@angular/core';
import {Department} from './department'; 
import{DEPARTMENTS } from './mock-departments';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor() { }

  getDepartments() : Department[] {
    return DEPARTMENTS; 
  }
  add(newdep: Department): Observable<Department>{
    DEPARTMENTS.push(newdep); 
    return of (newdep);
  }

  delete(dep: Department): Observable<Department> {
    DEPARTMENTS.splice(DEPARTMENTS.indexOf(dep), 1);
    return of(dep);
  }
}
