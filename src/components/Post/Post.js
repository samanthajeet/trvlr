import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux'

class Post extends Component {
  constructor(props){
    super(props)
    this.state = {
      post: [],
      userIdMatch: false
    }
  }

  componentWillMount(){
    this.getPost()
  }

  // componentDidMount(){
  //   this.checkUserIdMatch()
  // }

  getPost(){
    axios.get(`/journal/${this.props.match.params.post_id}`).then( response => {
      this.setState({
        post: response.data
      })
    })
    // this.checkUserIdMatch()
  }
  
  // checkUserIdMatch(){
  //   if(this.post.user_id === this.props.user_id){
  //     this.setState({
  //       userIdMatch: true
  //     })
  //   }
  // }
  
  render() { 
    const { post_title, post_text, post_image1, username, user_id} = this.state.post
    return ( 
      <div>
        <h1>{post_title}</h1>
        <h4>by {username}</h4>
        <img src={post_image1} alt={post_title} />
        <p>{post_text}</p>
        <button onClick={() => this.props.history.push('/dashboard')} >go back to your dashboard</button>

        <button onClick={() => this.props.history.push('/journal')} >go back to your journal</button>
        {this.state.userIdMatch? (
          <button >edit</button>
          ) : (
              null
          )}
        
      </div>
     );
  }
}

const mapSTateToProps = (reduxState) => {
  return reduxState
}
 
export default connect(mapSTateToProps)(Post);