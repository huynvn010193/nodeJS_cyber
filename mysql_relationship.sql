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

insert into orders(order_date, price, amount)
values("2021-03-17", 700, 80),
("2021-02-13", 900, 50),
("2021-01-17", 1600, 10);

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
select concat(first_name, " ", last_name) as ho_va_ten , ifnull(sum(amount), 0) as tong_sp from customers
left join orders
on customers.customer_id = orders.customer_id
group by customers.customer_id
order by tong_sp desc;

-- RIGHT JOIN
-- Tìm khách hàng đã mua sản phẩm vào tháng 2
select ifnull(concat(first_name, " ", last_name),"miss") as ho_va_ten from customers
right join orders
on customers.customer_id = orders.customer_id
where order_date like "%-02-%";

-- full join: sự kết hợp giữa right join và left join: dùng từ khóa union
select * from customers
left join orders
on customers.customer_id = orders.customer_id
union
select * from customers
right join orders
on customers.customer_id = orders.customer_id;

-- Mối quan hệ N - N : many - many
create table laptops (
	id int primary key auto_increment,
    name varchar(150) not null,
    description varchar(1000) not null,
    price double not null
);

insert into laptops(name, description, price)
values("Macbook M1", "laptops xịn nhất hiện nay", 4000),
("Acer Nitro 5", "laptops gaming đỉnh cao", 1500),
("Dell Gaming G3", "laptops gaming mỏng nhẹ", 1600),
("Razer Blade 15", "laptops đồ hoạ đỉnh cao", 5000);

create table stores (
	id int primary key auto_increment,
    name varchar(150) not null,
    address varchar(250) not null
);

insert into stores(name, address)
values("FPT shop", "150 Cao Thắng quận 3 TPHCM"),
("Điện máy xanh", "203 150 Điện Biên Phủ quận 3 TPHCM"),
("Thế giới đi động", "10 3/2 quận 10 TPHCM");

create table laptops_stores (
	id int primary key auto_increment,
    laptop_id int,
    store_id int,
    foreign key (laptop_id) references laptops(id),
    foreign key (store_id) references stores(id)
);

insert into laptops_stores(laptop_id, store_id) values
(1 , 1), ( 1, 2),
(2 , 2), (1 , 3),
(3 , 1), (3 , 2), (3 , 3);


-- Tìm xem điện máy xanh đang bán những mẫu laptop nào 
	-- B1: join các table lại với nhau
	-- B2: Tìm tên điện máy xanh
    -- B3: Lấy ra tên laptop và giá.

select laptops.name, laptops.price from stores
inner join laptops_stores
on stores.id = laptops_stores.store_id
inner join laptops
on laptops.id = laptops_stores.laptop_id
where stores.name = "Điện máy xanh";

-- Tìm xem macbook M1 đang được bán tại những cửa hàng nào
-- B1: Join các bảng lại với nhau
-- B2: Tìm tên sản phẩm laptops.name = macbook M1
-- B3: Lấy ra tên cửa hàng có bán sản phẩm.

select stores.name from stores
inner join laptops_stores
on stores.id = laptops_stores.store_id
inner join laptops
on laptops.id = laptops_stores.laptop_id
where laptops.name like "%Macbook M1%";

-- Left Join - many to many
-- Tìm xem các laptop chưa dc bán ở bất kỳ cửa hàng nào cả
-- B1 : Join các table lại với nhau
-- B2: Tìm xem laptops nào chưa dc bán
-- B3: Lấy tên và giá

select laptops.name, laptops.price  from laptops
left join laptops_stores
on laptops.id = laptops_stores.laptop_id
left join stores
on stores.id = laptops_stores.store_id
where stores.id is null;

-- Right Join - many to many
-- Tìm xem Macbook M1 có được bán tại thế giới di động hay không ?
-- Các bước thực hiện:
-- B1: Join các table lại với nhau
-- B2: Setup điều kiện
-- B3: Lấy ra tên

select * from laptops
right join laptops_stores
on laptops.id = laptops_stores.laptop_id
right join stores
on stores.id = laptops_stores.store_id
where laptops.name = "Macbook M1" and stores.name = "Thế giới di động"









