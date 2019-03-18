import React, {Component} from 'react';
import axios from 'axios'
import Avatar from '@material-ui/core/Avatar';
import './Community_Posts.css'

class Community_post extends Component {
  constructor(props){
    super(props)
    this.state = {
      liked: false,
    }
  }

  componentDidMount(){
    this.checkLike()
  }

  checkLike = async () => {
    try {
      let response = await axios.get(`/community/likePost/checkLikes/${this.props.post_id}`)
      if(response.data[0]){
        this.setState({
          liked:true
        })
      }
    } catch(err) {
      console.log(err)
    }
  }
  

  render() { 
    const {title, image1, authorImg, author, post_id, like_count, like_post } = this.props
    return ( 
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
        <button onClick={ () => this.props.history.push(`/journal/${post_id}`)}>view</button>
      </div>
      <div>


        <p>{like_count}</p>

        {this.state.liked ? (
          <p>liked</p>
        ): (
          <button onClick={ () => like_post(post_id)}> Like </button>
        )}
      </div>

    </div>

    );
  }
}
 
export default Community_post;
