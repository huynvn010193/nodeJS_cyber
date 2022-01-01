drop database instagram;
create database instagram;

-- sử dụng database
use instagram;

-- xóa bảng
drop table if exists users;

-- tao bảng
create table users(
	id int,
    first_name varchar(255),
    last_name varchar(255),
    age int,
    birthday date
);

-- sửa cột first_name vs last_name thành chuỗi độ dài tối đa 150
alter table users
modify column first_name varchar(150),
modify column last_name varchar(160);

-- thêm cột user_type
alter table users
add column user_type varchar(100) default "client";

-- ràng buộc thuộc tính
alter table users
modify column id int primary key auto_increment;

-- ràng buộc thuộc tính không dc null
alter table users
modify column age int not null,
modify column first_name varchar(150) not null,
modify column last_name varchar(160) not null;

-- thêm data vào table
insert into users(first_name, last_name, age, birthday)
value ("Hào", "Nguyễn", 29, "1998-05-11"),
("Thảo", "Trương", 19, "1999-06-15"),
("Kha", "Le", 18, "2000-08-20");

drop table if exists comments;
create table comments(
	id int,
    comment_text varchar(255),
    create_at timestamp
);

alter table comments
modify column id int primary key auto_increment;

alter table comments
modify column comment_text varchar(255) not null;

insert into comments(comment_text, create_at)
value ("Hao", "2020-12-05 01:30:59"),
("Code cyberSoft thật đỉnh", "2020-07-14 16:02:47"),
("No Comment", "2021-01-27 23:59:32");

-- Đọc data từ table database
select * from users;

select last_name as họ, first_name as tên, age as tuoi from users
where age = 19;

update users set user_type = "admin"
where id = 2;

-- tắt chế đội an toàn
SET SQL_SAFE_UPDATES = 0;

update users set age = 20
where age = 19;
