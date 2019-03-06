select *
from posts p
join users u
on u.user_id = p.user_id
where p.post_title ilike '%' || ${search} || '%'
order by p.post_id DESC