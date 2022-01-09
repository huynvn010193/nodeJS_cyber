drop database if exists mysql_relationship;
create database mysql_relationship;

use mysql_relationship;

-- tạo bảng customer -- tạo bảng 1 (trong mối quan hệ 1 - n)
create table customers(
	customer_id int primary key auto_increment,
    first_name varchar(150) not null,
    last_name varchar(150) not null,
    email varchar(200) not null,
    birthday date not null
);

-- tạo bảng orders -- tạo bảng nhiều (trong mối quan hệ 1 = n)
create table orders(
	order_id int primary key auto_increment,
    order_date date not null,
    price float not null,
    amount double not null,
    customer_id int,
    foreign key (customer_id) references customers(customer_id)
);

