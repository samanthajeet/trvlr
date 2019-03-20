update users
set user_image = ${user_image},
    username = ${username},
    city = ${city},
    country = ${country}
where user_id = ${user_id};

select *
from users
where user_id = ${user_id}
