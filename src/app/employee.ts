import { Department } from './department';

export class Employee {
  constructor(
    public id: number,
    public name: string,
    public tel: string, //telephone
    public doh: string, //date of hire
    public department: Department
  ) { }
}