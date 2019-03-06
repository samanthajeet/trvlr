select *
from posts p
join users u
on u.user_id = p.user_id
where p.post_id = ${post_id}