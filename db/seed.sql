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


insert into posts(user_id, post_title, post_text, post_image1)
values(4, 'Am I Beyonce?', 'I AM', 'https://media.npr.org/assets/img/2018/10/11/hsieh_angela_music_turntables_beyonce_wide-0a3bbf1dd333de9f77c0795468fec0c987eb63c8-s800-c85.jpg'),
(5, 'Pyramid of Greatness', 'Honor: If you need it defined you dont have it', 'https://www.nbcstore.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/9/1/91frcam3brl._sl1500_.jpg');

