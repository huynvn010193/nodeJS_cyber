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

-- Xác định người dùng nào không còn hoạt động
select users.username from users
left join photos
on users.id = photos.user_id
where photos.user_id is null;

-- Xác định xem người ảnh nào có nhiều like nhất và người dùng tạo ra nó là ai ?
select photos.image_url, count(*) as total from users
inner join likes
on users.id = likes.user_id
inner join photos
on photos.id = likes.photo_id
group by photos.id
order by total desc
limit 1;

-- Tìm số lượng trung bình cho mỗi người dùng
-- Sử dụng câu truy vấn phụ
select count(*) from photos;
select count(*) from users;

select ( select count(*) from photos ) / ( select count(*) from users ) as avg_user_photos;
