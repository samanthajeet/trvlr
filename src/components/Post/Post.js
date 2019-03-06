import React, {Component} from 'react';
import axios from 'axios';

class Post extends Component {
  constructor(props){
    super(props)
    this.state = {
      post: []
    }
  }

  componentDidMount(){
    console.log(this.props)
    axios.get(`/journal/${this.props.match.params.post_id}`).then( response => {
      this.setState({
        post: response.data
      })
    })
  }

  render() { 
    console.log(this.state.post)
    const { post_title, post_text, post_image1, username } = this.state.post
    return ( 
      <div>
        <h1>{post_title}</h1>
        <h4>by {username}</h4>
        <img src={post_image1} alt={post_title} />
        <p>{post_text}</p>
        <button onClick={() => this.props.history.push('/dashboard')} >go back to your dashboard</button>

        <button onClick={() => this.props.history.push('/journal')} >go back to your journal</button>
      </div>
     );
  }
}
 
export default Post;