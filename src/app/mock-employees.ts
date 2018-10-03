import { Employee } from './employee';
import { DEPARTMENTS } from './mock-departments';


export const EMPLOYEES: Employee[] = [
  new Employee(11, 'Bob Greg', '+12025550101', '12/06/97', DEPARTMENTS[1]),
  new Employee(12, 'Danika Duran', '+12020970941', '12/06/97', DEPARTMENTS[5]),
  new Employee(13, 'Elwood Herring', '+12025550101', '12/06/97', DEPARTMENTS[2]),
  new Employee(14, 'Mikey Dawe', '+16435507225', '12/06/97', DEPARTMENTS[2]),
  new Employee(15, 'Safaa Hussain', '+15515838752', '12/06/97', DEPARTMENTS[7]),
  new Employee(16, 'Zane Fraser', '+12025550101', '12/06/97', DEPARTMENTS[6]),
  new Employee(17, 'Macey Grainger', '+12025550101', '12/06/97', DEPARTMENTS[7]),
  new Employee(18, 'LexiMai Bradshaw', '+12025550101', '12/06/97', DEPARTMENTS[7]),
  new Employee(19, 'Sonya Andersen', '+12025550101', '12/06/97', DEPARTMENTS[8])
];