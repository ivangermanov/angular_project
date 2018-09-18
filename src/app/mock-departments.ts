import { Department } from './department';
import { EMPLOYEES } from './mock-employees';

export const DEPARTMENTS: Department[] = [
  new Department(1, 'IT', 'programming', [EMPLOYEES[0], EMPLOYEES[1]]),
  new Department(2,  'Marketing', 'advertising', [EMPLOYEES[3], EMPLOYEES[4]]),
  new Department(3, 'Accountancy',  'TestRole', ),
  new Department(4, 'Management',  'TestRole',  ),
  new Department(5, 'Media', 'TestRole', [EMPLOYEES[2]]),
  new Department(6, 'Production', 'TestRole', [EMPLOYEES[5]]),
  new Department(7, 'Service',  'TestRole', [EMPLOYEES[6], EMPLOYEES[7], EMPLOYEES[8]]),
  new Department(8, 'Manufacturing',  'TestRole' ),
  new Department(9, 'Secretary',  'TestRole', [EMPLOYEES[9]])
];