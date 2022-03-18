use vexere_db;
SELECT * FROM vexere_db.users;

update users
set type = "ADMIN"
where id = 2;

update users
set email = "hao2350@gmail.com"
where id = 2;