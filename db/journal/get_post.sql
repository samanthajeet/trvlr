select u.username, u.user_image, u.user_id, p.post_city, p.post_country, p.post_text, p.post_image1, p.post_like, p.post_title, to_char(post_date, 'DD Mon YYYY') as post_date
from posts p
join users u
on u.user_id = p.user_id
where p.post_id = ${post_id}