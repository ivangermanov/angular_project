import { Employee } from './employee';
import { DEPARTMENTS } from './mock-departments';


export const EMPLOYEES: Employee[] = [
  new Employee(11, 'Bob Greg', '+1-202-555-0101', '12/06/97', DEPARTMENTS[1]),
  new Employee(12, 'Danika Duran', '+1-202-097-0941', '12/06/97', DEPARTMENTS[5]),
  new Employee(13, 'Elwood Herring', '+1-202-555-0101', '12/06/97', DEPARTMENTS[2]),
  new Employee(14, 'Mikey Dawe', '+1-643-550-7225', '12/06/97', DEPARTMENTS[2]),
  new Employee(15, 'Safaa Hussain', '+1-551-583-8752', '12/06/97', DEPARTMENTS[7]),
  new Employee(16, 'Zane Fraser', '+1-202-555-0101', '12/06/97', DEPARTMENTS[6]),
  new Employee(17, 'Macey Grainger', '+1-202-555-0101', '12/06/97', DEPARTMENTS[7]),
  new Employee(18, 'Lexi-Mai Bradshaw', '+1-202-555-0101', '12/06/97', DEPARTMENTS[7]),
  new Employee(19, 'Sonya Andersen', '+1-202-555-0101', '12/06/97', DEPARTMENTS[9])
];