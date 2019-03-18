UPDATE posts 
  SET post_like = post_like + 1
WHERE post_id = ${post_id};