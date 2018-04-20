


drop database if EXISTS animals_db;
create database animals_db ;
use animals_db;
create table people (

id int(11) auto_increment not null,
name varchar (30) not NULL,
has_pet boolean not NULL,
pet_name varchar (30),
pet_age int(10),
primary key (id)
);


insert into people (name , has_pet,pet_name , pet_age ) VALUES ( 'jacob', true , 'misty' , 10);
insert into people (name , has_pet,pet_name , pet_age ) VALUES ( 'peter', true ,'zoe'  , 2);

select * from people ;
