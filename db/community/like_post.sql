UPDATE posts 
  SET post_like = post_like + 1
WHERE post_id = ${post_id};

insert into user_likes(user_id, post_id)
values(${user_id}, ${post_id})