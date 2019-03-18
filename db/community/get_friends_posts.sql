select  p.user_id, u.username, u.user_image, p.post_title, p.post_date, p.post_text, p.post_image1
from friends f
    left join posts p on p.user_id = f.friend_id
    left join users u on u.user_id = f.friend_id
where f.user_id = ${user_id}