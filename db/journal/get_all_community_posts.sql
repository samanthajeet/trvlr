select p.post_id,  u.username, u.user_image, p.post_title, p.post_text, p.post_image1, p.post_date, p.post_like, p.post_city, p.post_country
from posts p
  join users u on u.user_id = p.user_id
order by p.post_id desc
