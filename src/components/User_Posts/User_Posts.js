import React, {Component} from 'react';
import './UserPosts.css'


class UserPosts extends Component {
  
  render() { 
    const {title, image1, text, post_id } = this.props
    return ( 
      <div className="userPost">
        <fig className="userpostimage">
          <img src={image1} alt={title} />
        </fig>
        <div className="userposttext">
          <h1>{title}</h1>
          <button onClick={ () => this.props.history.push(`/journal/${post_id}`)}> view </button>
          <button onClick={ () => this.props.history.push(`/editPost/${post_id}`)}> edit </button>
          <button onClick={() => {this.props.delete(post_id)}}> delete </button>
          <button onClick={() => { if (window.confirm('Are you sure you wish to delete this item?')) this.props.delete(post_id) } } > delete two </button>

        </div>
        
      </div>
     );
  }
}
 
export default UserPosts;


