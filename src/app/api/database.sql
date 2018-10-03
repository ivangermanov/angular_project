drop table if exists EmployeeTask;
drop table if exists Task;
drop table if exists Employee;
drop table if exists Department;

create table Department
(
   id int not null auto_increment,
   name_department varchar(50),
   role varchar(50),
   primary key(id)
);

create table Employee
(
   id int not null auto_increment,
   name_employee varchar(55),
   department_id int not null, 
   telephone varchar(12),
   date_of_hire date,
   primary key (id),
   foreign key(department_id) references department(id)
);

create table Task
(
   id int not null auto_increment,
   department_id int not null,
   name_task varchar(50),
   reason varchar(100),
   due_date date,
   primary key (id),
   foreign key(department_id) references department(id)
);

create table EmployeeTask
(
   employee_id int not null,
   task_id int not null,
   primary key(employee_id, task_id),
   foreign key(employee_id) references employee(id),
   foreign key(task_id) references task(id)
);
