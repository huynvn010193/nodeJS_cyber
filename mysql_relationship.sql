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
values('Thảo','Trương','thaotruong@gmail.com','1999-11-12'),
('Hào','Nguyễn','hao@gmail.com','1997-05-11'),
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

-- kỹ thuật inner join
-- Cách 1 : Tìm đơn đặt hàng K/H tên Hào
select * from customers, orders
where customers.customer_id = orders.customer_id && first_name = "Hào";

-- Cách 2
select * from customers
inner join orders
on customers.customer_id = orders.customer_id
where first_name = "Hào";

-- BT inner join: lấy ra người dùng nào có đơn đặt hàng lớn hơn hoặc bằng 1000
select concat(first_name, " ", last_name) as ho_va_ten from customers
inner join orders
on customers.customer_id = orders.customer_id
where price >= 1000;

-- left join: bảng nào select ... from:  thì bảng đó nằm bên trái , bảng left join thì là bảng bên tay phải
-- lấy ra những khách hàng chưa có đơn đặt hàng
select concat(first_name, " ", last_name) as ho_va_ten from customers
left join orders
on customers.customer_id = orders.customer_id
where orders.customer_id is null;

-- lấy ra những khách hàng có đơn đặt hàng rồi
select concat(first_name, " ", last_name) as ho_va_ten from customers
left join orders
on customers.customer_id = orders.customer_id
where orders.customer_id is not null;

-- VD 2: Left join : tính tổng số lượng sản phẩm đã mua của khách hàng
-- Tắt chế độ nghiêm ngặt trên macbook: set global sql_mode = ''
-- ifnull(sum(amount), 0): nếu mà null thì cho là 0 còn khác null -> sum(amount)
select *, ifnull(sum(amount), 0) as tong_sp from customers
left join orders
on customers.customer_id = orders.customer_id
group by customers.customer_id
order by tong_sp desc;
