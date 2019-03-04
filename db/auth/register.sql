insert into users (username, email, password, user_image)
values(${username}, ${email}, ${password}, 'https://i.etsystatic.com/5805234/r/il/1a38f2/825515703/il_570xN.825515703_19nf.jpg')

returning username, email, user_image