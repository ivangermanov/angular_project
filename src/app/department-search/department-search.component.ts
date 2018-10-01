import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
 
import { debounceTime, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
 import {Department} from '../department'; 
 import {DepartmentService} from '../department.service';
@Component({
  selector: 'app-department-search',
  templateUrl: './department-search.component.html',
  styleUrls: ['./department-search.component.css']
})
export class DepartmentSearchComponent implements OnInit {

  departments$: Observable<Department[]>; 
  private searchTerms = new Subject<string>(); 
  constructor(private departmentService: DepartmentService) { }
  
  search(term: string): void {
    this.searchTerms.next(term);
  }
  ngOnInit(): void { 
    this.departments$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.departmentService.searchDepartments(term)),
      map(departments => departments["records"]));
  }
}
