import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {updateUser} from '../../ducks/reducer';
import CommunityPost from '../Community Posts/Community_Post';
import CommunityUsers from '../Community Members/CommunityMembers'

import './Community.css'


class Community extends Component {
  constructor(props){
    super(props);
    this.state = {
      user_id: null,
      communityPosts: [],
      users: [],
      user_search: '',
      search: '',
      communityView: 'posts',
    }
  }

  componentDidMount(){
    this.getCommunityPosts();
    this.getUsers();
    this.getUser()
  }

  getCommunityPosts = async () => {
    try{
      let posts = await axios.get('/journal/getAllCommunityPosts')
      this.setState({
        communityPosts: posts.data
      })
    } catch(err) {
      console.log(err)
    }
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

  getUsers = async () => {
    try{
      let users = await axios.get(`/community/getAllUsers`)
      this.setState({
        users: users.data
      })


    }catch(err){
      console.log(err)
    }
  }

  handleChange(prop, val){
    this.setState({
      [prop]: val
    })
  }

  searchByTitle = async () => {
    const {search} = this.state
    try {
      let searchResults = await axios.get(`/journal/searchTitle?search=${search}`)
      this.setState({
        communityPosts: searchResults.data
      })
      
    } catch(err) {
      console.log(err)
    }
  } 

  addFriend = async(friend_id) =>{
    try{
      let addFriend = await axios.post(`/community/addfriend/`, {friend_id} )
      console.log(addFriend)
    } catch(err){
      console.log(err)
    }
  }

  changeCommunityView(val) {
    this.setState({
      communityView: val
    })
  }


  render() { 
    let mappedUsers = this.state.users.filter( e => e.username.toLowerCase().includes(this.state.user_search) ).map( user => {
      return (
        <div key={user.user_id}>
          <CommunityUsers
            username={user.username}
            user_image={user.user_image}
            user_id={user.user_id}
            addFriend={this.addFriend}
          />

        </div>
      )
    })

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
            like_count={post.post_like}
            history={this.props.history} 
            />
        </div>
      )
    })


    return ( 

      <div>
        <h2>
          <span className="trvlr" > trvlr </span>
          community
        </h2>
        <button onClick={() => this.changeCommunityView('posts')} >posts</button>
        <button onClick={() => this.changeCommunityView('people')} >people</button>
        {this.state.communityView === 'posts' ? (
          <div>
            <div className='search-posts'>
              <input
                type="text"
                placeholder="search post titles"
                onChange={(e) => this.handleChange('search', e.target.value)}
              />
              <button onClick={this.searchByTitle} >Search</button>
              <button onClick={this.getCommunityPosts} >Reset Search</button>
            </div>
            <div className="community-posts">{mappedPosts}</div>
          </div>
        ): (
          <div>
            <input
              type="text"
              placeholder="search by username"
              onChange={(e) => this.handleChange('user_search', e.target.value)}
            />
            <button>Search users</button>
            {mappedUsers}
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
 
export default connect(mapStateToProps, mapDispatchToProps)(Community);