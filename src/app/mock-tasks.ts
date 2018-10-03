import { Task } from './task';
import { DEPARTMENTS } from './mock-departments';
import { EMPLOYEES } from './mock-employees';

export const TASKS: Task[] = [
  { id: 1, name: 'Clean', reason: 'Bring some order', dueDate: '2018-12-26', department: DEPARTMENTS[0], employees: [EMPLOYEES[0], EMPLOYEES[1]]},
  { id: 2, name: 'Cook', reason: 'Don\'t starve', dueDate: '2018-12-26', department: DEPARTMENTS[1], employees: [EMPLOYEES[2], EMPLOYEES[3]]},
  { id: 3, name: 'Throw trash', reason: 'No rotten smell inside', dueDate: '2018-12-26', department: DEPARTMENTS[2], employees: [EMPLOYEES[4], EMPLOYEES[5]]},
  { id: 4, name: 'Buy toilet paper', reason: 'Self-explanatory', dueDate: '2018-12-26', department: DEPARTMENTS[3], employees: [EMPLOYEES[6], EMPLOYEES[7]]},
  { id: 5, name: 'Buy groceries', reason: 'Not having to shop for the whole week', dueDate: '2018-12-26', department: DEPARTMENTS[4], employees: [EMPLOYEES[8], EMPLOYEES[1]]},
  { id: 6, name: 'Vacuum', reason: 'Bring some order', dueDate: '2018-12-26', department: DEPARTMENTS[5], employees: [EMPLOYEES[2], EMPLOYEES[3]]},
  { id: 7, name: 'Kids to school', reason: 'You want your children educated', dueDate: '2018-12-26', department: DEPARTMENTS[6], employees: [EMPLOYEES[4], EMPLOYEES[5]]},
  { id: 8, name: 'Buy milk', reason: 'Someone already drank it', dueDate: '2018-12-26', department: DEPARTMENTS[7], employees: [EMPLOYEES[6], EMPLOYEES[7]]},
  { id: 9, name: 'Pay bills', reason: 'Not being thrown out on the streets', dueDate: '2018-12-26', department: DEPARTMENTS[8], employees: [EMPLOYEES[8], EMPLOYEES[1]]},
];