USE ig_clone;

-- Lấy ra 5 người sử dụng ứng dụng lâu nhất
select * from users
order by created_at
limit 5;