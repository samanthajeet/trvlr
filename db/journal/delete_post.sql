
delete
from user_likes
where post_id = ${post_id};

delete
from posts
where post_id = ${post_id};

select p.post_id, u.user_id,  u.username, u.user_image, p.post_title, p.post_text, p.post_image1, p.post_date
from posts p
join users u
on u.user_id = p.user_id
where u.user_id = ${user_id}
order by p.post_id desc