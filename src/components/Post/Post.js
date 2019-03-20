import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import './Post.css'

class Post extends Component {
  constructor(props){
    super(props)
    this.state = {
      post: [],
      userIdMatch: false
    }
  }

  componentWillMount(){
    this.getPost();
    // this.checkUserIdMatch()
  }


  getPost(){
    axios.get(`/journal/${this.props.match.params.post_id}`).then( response => {
      this.setState({
        post: response.data
      })
    })
  }
  
  // checkUserIdMatch = () => {
  //   if(this.post.user_id === this.props.user_id){
  //     this.setState({
  //       userIdMatch: true
  //     })
  //   }
  // }
  
  render() { 
    const { post_title, post_text, post_image1, username} = this.state.post
    console.log(post_text)
    return ( 
      <div className="post-container">
        <div className="post">
          <h1>{post_title}</h1>
          <h4>by {username}</h4>
          <div className="postimage">
            <img src={post_image1} alt={post_title} />
          </div>
        
          <div dangerouslySetInnerHTML={{__html: post_text }} className="post-text" />
            
          </div>
          <div className="postbtns">
            <button onClick={() => window.history.back()} >go back </button>
            {this.state.userIdMatch? (
              <button >edit</button>
              ) : (
                  null
              )}
          </div>
      </div>
     );
  }
}

const mapSTateToProps = (reduxState) => {
  return reduxState
}
 
export default connect(mapSTateToProps)(Post);