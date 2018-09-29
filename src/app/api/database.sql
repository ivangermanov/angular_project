drop table if exists EmployeeTask;
drop table if exists Task;
drop table if exists Employee;
drop table if exists Department;

create table Department
(
   id int not null AUTO_INCREMENT,
   name varchar(50),
   role varchar(50),
   primary key(id)
);

create table Employee
(
   id int not null auto_increment,
   department_id int not null,
   name varchar(55),
   date_of_hire date,
   telephone varchar(12),
   primary key (id),
   foreign key(department_id) references department(id)
);

create table Task
(
   id int not null auto_increment,
   department_id int not null,
   name varchar(50),
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

INSERT INTO `task` (`id`, `department_id`, `name_task`, `reason`, `due_date`) VALUES ('1', '1', 'Clean', 'Bring some order', '2018-09-26');
INSERT INTO `task` (`id`, `department_id`, `name_task`, `reason`, `due_date`) VALUES ('2', '2', 'Cook', 'Don\'t starve', '2018-09-26');
INSERT INTO `task` (`id`, `department_id`, `name_task`, `reason`, `due_date`) VALUES ('3', '3', 'Throw trash', 'No rotten smell inside', '2018-09-26');
INSERT INTO `task` (`id`, `department_id`, `name_task`, `reason`, `due_date`) VALUES ('4', '4', 'Buy toilet paper', 'Self-explanatory', '2018-09-26');
INSERT INTO `task` (`id`, `department_id`, `name_task`, `reason`, `due_date`) VALUES ('5', '5', 'Buy groceries', 'Not having to shop for the whole week', '2018-09-26');
INSERT INTO `task` (`id`, `department_id`, `name_task`, `reason`, `due_date`) VALUES ('6', '6', 'Vacuum', 'Bring some order', '2018-09-26');
INSERT INTO `task` (`id`, 	`department_id`, `name_task`, `reason`, `due_date`) VALUES ('7', '7', 'Kids to school', 'You want your children educated', '2018-09-26');
INSERT INTO `task` (`id`, `department_id`, `name_task`, `reason`, `due_date`) VALUES ('8', '8', 'Buy milk', 'Someone already drank it', '2018-09-26');
INSERT INTO `task` (`id`, `department_id`, `name_task`, `reason`, `due_date`) VALUES ('9', '9', 'Pay bills', 'Not being thrown out on the streets', '2018-09-26');