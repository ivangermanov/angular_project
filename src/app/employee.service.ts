import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { Department } from './department';
import { EMPLOYEES } from './mock-employees';
import { Observable, of } from 'rxjs';
import { DepartmentService } from './department.service';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  employees$: Observable<Employee[]>;
  private employeesUrl = "http://i380810.hera.fhict.nl/api/employees";

  //changed for the web app
  getEmployees(): Observable<Employee[]> {
    return this._http
      .get(`${this.employeesUrl}/read.php`)
      .pipe(map((res: Response) => res.json()));
  }
  
  getEmployeesOfDepartment(department: Department): Observable<Employee[]> {
    return this._http
    .get(`${this.employeesUrl}/read_employee_department.php?s=` + department.id)
    .pipe(map((res: Response) => res.json()));
  }

  //changed for the web app
  add(newdep: Employee): Observable<Employee> {
    EMPLOYEES.push(newdep);
    return of(newdep);
  }


  addEmployee(employee: Employee): Observable<Employee> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let jsonEmployee = this.jsonifyEmployee(employee);
    
    return this._http.post(
      `${this.employeesUrl}/create.php`,
      jsonEmployee,
      options
    ).pipe(map((res: Response) => {
      if (res.ok) {
        return of(employee);
      } else {
        return res.json();
      }
    }));
  }

  getEmployee(id: number): Observable<Employee> {
    return this._http
      .get(`${this.employeesUrl}/read_one.php?id=` + id)
      .pipe(map((res: Response) => res.json()));
  }

  searchEmployees(term: string): Observable<Employee[]> {
    if (!term.trim()) {
      return of([]);
    }
    return this._http
      .get(`${this.employeesUrl}/search.php?s=` + term)
      .pipe(map((res: Response) => res.json()));
  }

  deleteEmployee(employee: Employee): Observable<Employee> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post(
      `${this.employeesUrl}/delete.php`,
      { id: employee.id },
      options
    ).pipe(map((res: Response) => res.json()));
  }

  updateEmployee(employee: Employee): Observable<Employee> {

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    let jsonEmployee = this.jsonifyEmployee(employee);

    return this._http.post(
      `${this.employeesUrl}/update.php`,
      jsonEmployee,
      options
    ).pipe(map((res: Response) => {
      if (res.ok) {
        return of(employee);
      } else {
        return res.json();
      }
    }));
  }

  jsonifyEmployee(employee: Employee): object {

    let jsonEmployee = {
      "id": employee.id, "telephone": employee.telephone, "name_employee": employee.name,
      "date_of_hire": employee.doh, "department_id": employee.department.id
    };

    return jsonEmployee;
  }

  constructor(
    private _http: Http
  ) { }
}
