import React, {Component} from 'react';
import UserPosts from './../User_Posts/User_Posts';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';

class PublicProfile extends Component {
  constructor(props){
    super(props)
    this.state = {
      posts: [],
      username: '',
      user_image: ''
    }

  }

  componentDidMount(){
    this.getUserInfo();
    this.getUserPosts();
  }

  getUserInfo = () => {
    axios.get(`/publicProfile/user/${this.props.match.params.user_id}`).then( response => {
      this.setState({
        username: response.data[0].username,
        user_image: response.data[0].user_image
      })
    })
  }

  getUserPosts =() => {
    axios.get(`/publicProfile/posts/${this.props.match.params.user_id}`).then( response => {
      this.setState({
        posts: response.data
      })
    })
  }


  render() { 
    let mappedPosts = this.state.posts.map( post => {
      return (
        <div key={post.post_id} style={{"width": "75vw", "display":"flex", "border": "1px solid red", "margin": "1%"}}>
          <img src={post.post_image1} alt={post.post_title}  style={{"width": "50%", "height": "50%"}} />
          <div>
            <h1>{post.post_title}</h1>
            <p>{post.post_text}</p>
          </div>
          
        </div>
      )
    })
    return ( 
      
      <div>
        <Avatar src={this.state.user_image} alt={this.state.username} style={{"width": 100, "height": 100}} />


        <h2>
          entries by
          <span className="trvlr" > {this.state.username} </span>
        </h2>
        {mappedPosts}
      </div>
     );
  }
}
 
export default PublicProfile;