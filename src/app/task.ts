import { Department } from './department';
import { Employee } from './employee';

export class Task {
    constructor(
        public id: number,
        public name: string,
        public reason: string,
        public dueDate: string,
        public employees: Employee[],
        public department: Department
      ) { }
}
