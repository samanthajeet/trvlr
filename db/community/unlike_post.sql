UPDATE posts
 set post_like = post_like - 1
WHERE post_id = ${post_id};

delete
from user_likes
where user_id = ${user_id} and post_id = ${post_id}