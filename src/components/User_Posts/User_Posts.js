import React, {Component} from 'react';
import './UserPosts.css'


class UserPosts extends Component {
  
  render() { 
    const {title, image1, text,  author, post_id } = this.props
    return ( 
      <div className="userPost">
        <img src={image1} alt={title} />
        <h1>{title}</h1>
        <p>{text}</p>
        <p>{author}</p>
        
        <button onClick={ () => this.props.history.push(`/journal/${post_id}`)}>view</button>

        <button onClick={() => {this.props.delete(post_id)}}>delete</button>
      </div>
     );
  }
}
 
export default UserPosts;

