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
<<<<<<< HEAD
  private employeeService: EmployeeService,
=======
    private employeeService: EmployeeService,
>>>>>>> 120dd6520b79043be2dec6718008bdedf163cac0
    private _http: Http) { }

  getDepartment(id: number): Observable<Department> {
    return this._http
      .get(`${this.departmentsUrl}/read_one.php?id=` + id)
      .pipe(map((res: Response) => res.json()));

  }

  getDepartments(): Observable<Department[]> {
    //return DEPARTMENTS;
    return this._http
      .get(`${this.departmentsUrl}/read.php`)
      .pipe(map((res: Response) => res.json()));
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
    let employees = Array<Employee>();
    this.employeeService.getEmployees().subscribe((employees) => {
      employees.forEach(employee => {
        if (employee.department.id === department.id) {
          employees.push(employee);
        }
      });
    });

    return employees;
  }

<<<<<<< HEAD
 getEmployees(department: Department): Employee[] {
   let allEmployees = this.employeeService.getEmployees();
  let employees = Array<Employee>();
    allEmployees.forEach(employee =>{

     if (employee.department.id === department.id) {

        employees.push(employee);

     }
    });
   console.log(employees);
   return employees;
 }
//added by vlad for displaying dep in emp detail
//  getDepartment(id: number): Observable<Department> {
  //  return of(DEPARTMENTS.find(department => department.id === id));
  //}
//
=======
>>>>>>> 120dd6520b79043be2dec6718008bdedf163cac0
  delete(dep: Department): Observable<Department> {
    DEPARTMENTS.splice(DEPARTMENTS.indexOf(dep), 1);
    return of(dep);
  }


  //SEARCH department
  searchDepartments(term: string): Observable<Department[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this._http
      .get(`${this.departmentsUrl}/search.php?s=` + term)
      .pipe(map((res: Response) => res.json()));
  }

  //jsonify 
  jsonifyDepartment(department: Department): object {

    let jsonTask = {
      "id": department.id, "name_department": department.name, "role": department.role
    };

    return jsonTask;
  }
}
