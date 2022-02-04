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
value ("Hào", "Nguyễn", 17, "1998-05-11"),
("Lâm", "Nguyễn", 15, "1998-05-11"),
("Tuấn", "Nguyễn", 19, "1998-05-11"),
("Thảo", "Trương", 23, "1999-06-15"),
("nhi", "Trương", 32, "1998-05-11"),
("khoa", "Lê", 18, "1998-05-11"),
("Kha", "Lê", 21, "2000-08-20");

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

select last_name as họ, first_name as tên, age as tuoi from users
where age = 19;

update users set user_type = "admin"
where id = 2;

-- tắt chế đội an toàn
SET SQL_SAFE_UPDATES = 0;

update users set age = 20
where age = 19;

-- Xóa người dùng có id = 2
delete from users
where id = 2;

delete from users
where age < 19;

delete from users;

-- Đọc ra comments có id = 2
select * from comments
where id = 2;

-- Đọc ra comments dc tạo trước ngày 14/7
select * from comments
where create_at > '2020-12-05';

-- update comment_text id = 3
update comments set comment_text = "Hôm nay trời đẹp quá"
where id = 3;

-- xoá hết comments trong bảng
alter table comments
modify column comment_text varchar(255) null;

update comments 
set comment_text = null
WHERE comment_text is not null;

-- Nối chuỗi
select concat(first_name," ", last_name) as fullname from users;

-- Cắt chuỗi
-- lấy năm
select substr(birthday,1,4) as year_of_birth from users;
select substr(birthday,6,2) as month_of_birth from users;
select substr(birthday,9,2) as date_of_birth from users;

-- Thay thế chuỗi
select replace(user_type,"client","khách hàng") as loainguoidung from users;
select replace(user_type,"admin","quản trị") as loainguoidung from users;

-- đảo ngược
select reverse(last_name) as last_name_reverse from users;

-- viết hoa
select upper(first_name), lower(last_name) from users; 

-- Không lấy trùng nhau
select distinct last_name from users;

-- sắp xếp đội tuổi theo thứ tự tăng dần
select * from users
order by age asc;

-- sắp xếp đội tuổi theo thứ tự giảm dần
select * from users
order by age desc;

-- sắp xếp tên theo thứ tự aphabel
select * from users
order by first_name asc;

select * from users
order by birthday asc;

-- lấy ra 2 người dùng đầu tiên
select * from users
limit 2;

-- lấy ra 3 người dùng cuối cùng
select * from users order by id desc limit 3;

-- Đọc data từ table database
select * from users;

-- tìm kiếm last_name gần giống với chuỗi "ần". dấu % là ký tự gì cũng dc
select * from users
where last_name like '%ê%';

-- Các hàm tổng hợp
-- count
select count(*) as tong_so_luong_users from users;

-- đếm xem có bao nhiêu người họ nguyễn
select count(*) as ho_Nguyen from users where last_name = "Nguyễn";

-- đếm xem có bao nhiêu họ khác nhau
select count(distinct last_name) as ho_differnt from users;

-- Min - Max
-- tìm ra tuổi lớn nhất và nhỏ nhất
select min(age) as age_min, max(age) as age_max from users;

-- Tìm ra các user có độ tuổi nhỏ nhất
select * from users where age = (select min(age) from users);

-- Tìm ra các user có độ tuổi lớn nhất
select * from users where age = (select max(age) from users);

-- GROUP_BY: giúp thống kê
-- Lập nhóm người nào có last_name giống nhau
select last_name, count(*) from users
group by last_name;

-- Tính tổng tuổi của users
select last_name, sum(age) from users
group by last_name;

-- Tính trung bình tuổi của users
select last_name, avg(age) from users
group by last_name;

-- bài tập
-- Nếu comment dài hơn 8 ký tự thì cắt bỏ các ký tự phía sau và thay thế bằng dấu "..."
select comment_text, if(length(comment_text) > 8, replace(comment_text,substr(comment_text,9),"..."),comment_text) as chinhsua from comments;

-- Yêu cầu: lấy ra 3 comments
-- sắp xêp theo thời gian comment nào tạo ra trước thì dưới, tạo ra sau để ở trên
select * from comments order by create_at desc limit 3;

-- 




