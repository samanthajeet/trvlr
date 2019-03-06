import React, {Component} from 'react';
import {connect} from 'react-redux';
import {updateUser} from '../../ducks/reducer';
import Axios from 'axios';
import { withRouter} from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import CommunityPost from '../Community Posts/Community_Post'
import './Dashboard.css'

class Dashboard extends Component {
  constructor(props){
    super(props);
    this.state = {
      communityPosts: []
    }
    this.logout = this.logout.bind(this)
  }

  componentDidMount(){
    this.getUser();
    this.getCommunityPosts();
  }

  getUser = async () => {
    const {user_id} = this.props
    if(!user_id) {
      try {
        let response = await Axios.get('/auth/isLoggedIn')
        this.props.updateUser(response.data)
      } catch(err){
        this.props.history.push('/')
        console.log(err)
      }
    }
  }

  getCommunityPosts = async () => {
    try{
      let posts = await Axios.get('/journal/getAllCommunityPosts')
      this.setState({
        communityPosts: posts.data
      })
    } catch(err) {
      console.log(err)
    }
  }

  logout = () => {
    Axios.post('/auth/logout');
    this.props.history.push('/')
  }
 

  render() { 
    let mappedPosts = this.state.communityPosts.map( post => {
      return (
        <div key={post.post_id}>
          <CommunityPost
            title={post.post_title}
            image1={post.post_image1}
            text={post.post_text}
            author={post.username}
            authorImg={post.user_image}
            post_id={post.post_id}
            history={this.props.history} 
            
            />
        </div>
      )
    })

    let mappedRecent = mappedPosts.slice(0,4)
    return ( 
      <div>
        <Navigation 
          location={this.props.location} 
          history={this.props.history} 
          logout={this.logout}
      
        />
        <div  className="dashboard" >
          <h2>
            recent entries from the
            <span className="trvlr" > trvlr </span>
            community
          </h2>
          <div className="communityPostAll" >
            {mappedRecent} 
          </div>
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
 
export default withRouter(connect(mapStateToProps, mapDispatchToProps )(Dashboard));