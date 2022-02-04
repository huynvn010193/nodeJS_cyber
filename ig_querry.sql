USE ig_clone;

-- Lấy ra 5 người sử dụng ứng dụng lâu nhất
select * from users
order by created_at
limit 5;

-- Tìm 2 ngày trong tuần có lượt đăng ký nhiều nhất
-- dùng hàm dayname(a) lấy ra thứ
select dayname(created_at) as day, count(*) as total_register from users
group by day
order by total_register desc
limit 2;