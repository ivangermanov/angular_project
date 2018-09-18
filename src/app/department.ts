import { Employee } from './employee';

export class Department {
    public employees: Employee[];

    constructor(
    public id: number,
    public name: string,
    public role: string,
    employees?: Employee[]
    ) {
        this.employees = employees;
    }

    public addEmployee(e: Employee): void {
        this.employees.push(e);
        //e.department = this;
    }
}
