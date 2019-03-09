import React, {Component} from 'react'
import {connect} from 'react-redux';
import axios from 'axios';
import {updateUser} from '../../ducks/reducer';
import './NewPost.css'


class NewPost extends Component {
  constructor(props){
    super(props);
    this.state = {
      user_id: this.props.user_id,
      post_title: '',
      post_text: '',
      post_image: '',
      now: new Date(),
    }
  }

  componentDidMount(){
    this.getUser()
  }

  getUser = async () => {
    const {user_id} = this.props
    if(!user_id) {
      try {
        let response = await axios.get('/auth/isLoggedIn')
        console.log(response)
      } catch(err){
        console.log(err)
      }
    }
  }

  createPost = async() => {
    const {user_id} = this.props
    const {post_title, post_text, post_image} = this.state
    let post = {user_id,post_title, post_text, post_image}
    try {
      let response = await axios.post('/journal/createPost', post )
      this.props.history.push('/journal')
    } catch(err){
      console.log(err)
    }
    
  }

  formatTime(){
    let date = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(this.state.now)
    return date
  }


  handleChange(prop, val){
    this.setState({
      [prop] : val
    })
  }
  render() { 
    let timestampFormat = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit'}).format(this.state.now)

    return (
      <div className="newpost">
        <div>
          <p>post title</p>
          <input
            type="text"
            placeholder="Post Title"
            onChange={(e) => this.handleChange('post_title', e.target.value)}
          />
          <p>image</p>
          <input
            type="text"
            placeholder="image_urls"
            onChange={(e) => this.handleChange('post_image', e.target.value)}
          />
        </div>
        <div>
          <div>
            <p>post</p>
            <input
              style={{"width":"50%", "height":"10rem"}}
              type="text"
              placeholder="post"
              onChange={(e) => this.handleChange('post_text', e.target.value)}
            />
          </div>

          <div>
            <p>{timestampFormat}</p>
          </div>
          <button onClick={this.createPost} >Create New entry</button>
          <button onClick={() => this.props.history.push('/journal')} >Cancel</button>
        </div>
      </div>
     );
  }
}
 
const mapStateToProps = (reduxState) => {
  return reduxState
}

const mapDispatchToProps = {
  updateUser
}
 

export default connect(mapStateToProps, mapDispatchToProps)(NewPost);