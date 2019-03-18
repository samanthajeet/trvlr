import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import './Community_Posts.css'


export default function(props){
  const {title, image1, authorImg, author, post_id, like_count } = props
  return(

    <div className='communiytPost'>
      <fig className="communitypostimage">
        <img src={image1} alt={title}/>
      </fig>

      <div className="post-text" >
        <h3>{title}</h3>
      </div>
      <div className='author-view'>
        <div className="authorDetail">
          <Avatar src={authorImg} alt={author} />
          <p>{author}</p>
        </div>
        <button onClick={ () => props.history.push(`/journal/${post_id}`)}>view</button>
      </div>
      <div>
        <p>{like_count}</p>
      </div>

    </div>


  )
}