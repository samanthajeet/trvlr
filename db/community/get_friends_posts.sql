select  p.user_id, u.username, u.user_image, p.post_title, p.post_date, p.post_text, p.post_image1, p.post_id
from friends f
  join posts p on p.user_id = f.friend_id
  join users u on u.user_id = f.friend_id
where f.user_id = ${user_id}