create table users (
    user_id serial primary key not null,
    username varChar(50),
    email varChar,
    password varChar,
    user_image varchar
);

insert into users (username, email, password, user_image)
values('Liz Lemon', 'liz@testmail.com', 'password', 'http://cdn1.theodysseyonline.com/files/2015/11/13/635829908730227381-1996171562_liz-lemon.png'),
('Leslie Knope', 'leslie@testmail.com', 'password', 'https://upload.wikimedia.org/wikipedia/en/thumb/3/34/Leslie_Knope_%28played_by_Amy_Poehler%29.png/240px-Leslie_Knope_%28played_by_Amy_Poehler%29.png');




create table posts(
    post_id serial primary key not null,
    user_id integer REFERENCES users(user_id),
    post_title varChar,
    post_date date,
    post_text text,
    post_image1 text,
    post_image2 text,
    post_image3 text
);