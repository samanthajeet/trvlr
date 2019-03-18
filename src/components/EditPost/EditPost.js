import React, {Component} from 'react';
import axios from 'axios'
import {connect} from 'react-redux'

class EditPost extends Component {
  constructor(props){
    super(props);
    this.state = {
      post: [],
      post_id: 0,
      post_title: '',
      post_image1: '',
      post_text: ''

    }
  }

  componentDidMount(){
    this.getPost()
  }

  getPost(){
    axios.get(`/journal/${this.props.match.params.post_id}`).then( response => {
      console.log(response.data)
      let {post_id, post_title, post_image1, post_text} = response.data
      this.setState({
        post_id,
        post_title,
        post_image1,
        post_text,
      })
    })
  }

  handleChange(prop, val){
    this.setState({
      [prop]: val
    })
  }

  editPost(){
    const {post_id, post_title, post_image1 } = this.state
    let editedPost = {post_title, post_image1}
    axios.put(`/journal/edit/${post_id}`, editedPost).then(response => {
      console.log({response})
    })
    this.props.history.push(`/journal`)
  }
  
  render() { 

    return ( 
      <div>
        <div>
          <p>Post Title</p>
          <input
            type="text"
            value={this.state.post_title}
            onChange={(e) => this.handleChange('post_title', e.target.value)}
          />
        </div>

        <div>
          <p>main image</p>
          <input
            type="text"
            value={this.state.post_image1}
            onChange={(e) => this.handleChange('post_image1', e.target.value)}
          />
        </div>

        <div>
          <p>entry</p>
          <input
            type="text"
            value={this.state.post_text}
            onChange={(e) => this.handleChange('post_text', e.target.value)}
          />
        </div>

        <img src={this.state.post_image1} alt={this.state.post_title} />
        <button onClick={() => this.editPost()} >save changes</button>
        <button onClick={() => this.props.history.push(`/journal`)} >cancel</button>
      </div>
     );
  }
}
 
const mapSTateToProps = (reduxState) => {
  return reduxState
}

export default connect(mapSTateToProps)(EditPost);