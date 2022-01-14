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

insert into customers(first_name, last_name, email, birthday)
values ('Hào','Nguyễn','hao@gmail.com','1997-05-11'),
('Thảo','Trương','thaotruong@gmail.com','1999-11-12'),
('Hường','Lê','huong@gmail.com','1997-05-11');

-- tạo bảng orders -- tạo bảng nhiều (trong mối quan hệ 1 = n)
create table orders(
	order_id int primary key auto_increment,
    order_date date not null,
    price float not null,
    amount double not null,
    customer_id int,
    foreign key (customer_id) references customers(customer_id)
);

-- thêm data vào table
insert into orders(order_date, price, amount, customer_id)
values("2021-02-17", 1000, 80, 1),
("2021-02-13", 1500, 50, 2),
("2021-01-17", 500, 10, 1);

-- kỹ thuật cross join
-- Tìm ra đơn đặt hàng mà khách hàng Hào đã đặt
select * from orders where customer_id = (select customer_id from customers where first_name = "Hào");
