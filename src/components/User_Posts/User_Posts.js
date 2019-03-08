import React, {Component} from 'react';
import './UserPosts.css'


class UserPosts extends Component {
  
  render() { 
    const {title, image1, text,  author, post_id } = this.props
    return ( 
      <div className="userPost">
        <fig className="userpostimage">
          <img src={image1} alt={title} />
        </fig>
        <div className="userposttext">
          <button onClick={ () => this.props.history.push(`/journal/${post_id}`)}>view</button>
          <button onClick={() => {this.props.delete(post_id)}}>delete</button>
          <h1>{title}</h1>
          <div className="posttext">
            <p>{text}</p>
          </div>
        </div>
        
      </div>
     );
  }
}
 
export default UserPosts;


