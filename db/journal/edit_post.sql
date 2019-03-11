update posts
set post_title = ${post_title},
    post_text = ${post_text},
    post_image1 = ${post_image1}
where post_id = ${post_id};

select *
from posts
where post_id = ${post_id}
