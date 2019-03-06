import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import './Community_Posts.css'


export default function(props){
  const {title, image1, text, authorImg, author, post_id } = props
  return(

    <div className='communiytPost'>
      <img src={image1} alt={title} className="mainImage" />
      <div className="post-text" >
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
      <div className="authorDetail">
        <p>{author}</p>
        <Avatar src={authorImg} alt={author} />
      </div>

      <button onClick={ () => props.history.push(`/journal/${post_id}`)}>view</button>
    </div>


  )
}