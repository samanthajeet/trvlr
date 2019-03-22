import React, {Component} from 'react';
import axios from 'axios'; 
import {connect} from 'react-redux';
import {updateUser} from '../../ducks/reducer';
import UserPosts from './../User_Posts/User_Posts';
import { withRouter} from 'react-router-dom';
import ReactLoading from 'react-loading';
import './Journal.css'


class Journal extends Component {
  constructor(props){
    super(props)
      this.state = {
        user_id: null,
        userPosts: [],
        loading: true
      }

      this.deletePost = this.deletePost.bind(this)
    }

  componentDidMount() {
    this.getUser()
    this.getUserPosts()
  }


  getUserPosts(){
    axios.get(`/journal/getUserPosts`).then( post => {
      // console.log(post.data)
      this.setState({
        userPosts: post.data,
        loading: false
      })
    })
  }


  getUser = async () => {
    const {user_id} = this.props
    if(!user_id) {
      try {
        let response = await axios.get('/auth/isLoggedIn')
        this.setState({
          user_id: response.data.user_id
        })
        this.props.updateUser(response.data)
      } catch(err){
        this.props.history.push('/')
        console.log(err)
      }
    }
  }

  deletePost(post_id){
    axios.delete(`/journal/${post_id}`).then( response => {
      this.setState({
        userPosts: response.data
      })
    }).catch( err => {
      console.log(err)
    })
  }


  render() {
    let mappedPosts = this.state.userPosts.map( post => {
      return (
        <div key={post.post_id}>
          < UserPosts 
            title={post.post_title}
            image1={post.post_image1}
            text={post.post_text}
            delete={this.deletePost}
            post_id={post.post_id}
            post_date={post.post_date}
            like_count={post.post_like}
            history={this.props.history}
          />
        </div>
      )
    })
    

    return ( 


      <div className='journalLanding'> 
        {this.state.loading ? (
          <div>
            <h1>Loading</h1>
            <ReactLoading type='bubbles' color="#FFAA00" />
          </div>
        ): (
          <div className="journal">
            <div className="alluserposts">
            <div className="journal-sidebar">
              <h2>You have <span style={{"color":"#FFAA00"}} >{mappedPosts.length}</span> entries</h2>
              <button onClick={() => this.props.history.push('/newPost') }  className="journal-btn">New Entry</button>
              {/* <p>public profile: /publicProfile/{this.props.user_id}</p> */}
            </div>
              <div className="journaluserposts">
                {mappedPosts} 
              </div>
            </div>
          </div>
        ) }
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
 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Journal));