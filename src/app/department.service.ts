import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { Department } from './department';
import { DEPARTMENTS } from './mock-departments';
import { Observable, of } from 'rxjs';
import { EmployeeService } from './employee.service';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
 
  private departmentsUrl = "http://localhost/api/department";
  constructor(
    private employeeService: EmployeeService,
    private _http: Http) { }

 /* getDepartment(id: number): Observable<Department> {
    return of(DEPARTMENTS.find(department => department.id === id));
  }*/

  getDepartment(id: number): Observable<Department> {
   
    return this._http
      .get(`${this.departmentsUrl}/read_one.php?id=` + id)
      .pipe(map((res: Response) => res.json()));
   
  }
 
  getDepartments():Observable<Department[]> {
    //return DEPARTMENTS;
    return this._http 
      .get(`${this.departmentsUrl}/read.php`)
      .pipe(map((res:Response) => res.json()));
  }

   

  //CREATE 
    add(department: Department): Observable<Department> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let jsonTask = this.jsonifyDepartment(department);

    return this._http.post(
      `${this.departmentsUrl}/create.php`,
      jsonTask,
      options
    ).pipe(map((res: Response) => {
      if (res.ok) {
        return of(department);
      } else {
        return res.json();
      }
    }));
  }

  getEmployees(department: Department): Employee[] {
    let allEmployees = this.employeeService.getEmployees();
    let employees = Array<Employee>();
    console.log(department);
    console.log(allEmployees);
    allEmployees.forEach(employee => {
      console.log(employee);
      if (employee.department.id === department.id) {
        employees.push(employee);
      }
    });
    
    return employees;
  }

  /*delete(dep: Department): Observable<Department> {
    DEPARTMENTS.splice(DEPARTMENTS.indexOf(dep), 1);
    return of(dep);
  }*/
  delete(department: Department): Observable<Department> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post(
      `${this.departmentsUrl}/delete.php`,
      { id: department.id },
      options
    ).pipe(map((res: Response) => res.json()));

 }
  //SEARCH department
  searchDepartments(term: string): Observable<Department[]> {
    if(!term.trim()) {
      return of([]);
    }
    return this._http 
      .get(`${this.departmentsUrl}/search.php?s=` + term)
      .pipe(map((res:Response) => res.json()));
  }

  //jsonify 
  jsonifyDepartment(department: Department): object {
   
    let jsonDepartment = {
      "id": department.id, "name_department": department.name, "role": department.role
    };

    return jsonDepartment;
  }

  //UPDATE 
  updateDepartment(department: Department): Observable<Department> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let jsonDepartment = this.jsonifyDepartment(department);

    return this._http.post(
      `${this.departmentsUrl}/update.php`,
      jsonDepartment,
      options
    ).pipe(map((res: Response) => {
      if (res.ok) {
        return of(department);
      } else {
        return res.json();
      }
    }));
}
}
