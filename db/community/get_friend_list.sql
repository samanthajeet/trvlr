select username, user_image
from friends f
join users u
on u.user_id = f.friend_id
where f.user_id = ${user_id}