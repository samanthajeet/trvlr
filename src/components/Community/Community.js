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
      location_search: '',
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
    let mappedUsers = this.state.users.filter( user => user.username.toLowerCase().includes(this.state.user_search) || user.email.toLowerCase().includes(this.state.user_search) ).map( user => {
      return (
        <div key={user.user_id}>
          <CommunityUsers
            username={user.username}
            user_image={user.user_image}
            user_id={user.user_id}
            user_city={user.city}
            user_user_id={this.props.user_id}
            addFriend={this.addFriend}
          />

        </div>
      )
    })

    let mappedPosts = this.state.communityPosts.filter( post => post.post_city.toLowerCase().includes(this.state.location_search) || post.post_country.toLowerCase().includes(this.state.location_search)).map( post => {
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
            post_city={post.post_city}
            post_country={post.post_country}
            history={this.props.history} 
            />
        </div>
      )
    })


    return ( 

      <div className="community">
        <div>
          <button onClick={() => this.changeCommunityView('posts')} >posts</button>
          <button onClick={() => this.changeCommunityView('people')} >people</button>
        </div>
        {this.state.communityView === 'posts' ? (
          <div>
            <h2>posts from the <span style={{"color":"#FFAA00"}} >trvlr</span> community</h2>
            <input
              type="text"
              placeholder="search posts by location"
              onChange={(e) => this.handleChange('location_search', e.target.value)}
            />
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
          <div className="communityusers-container">
          <div className="searchUsers">
            <input
              type="text"
              placeholder="search by username or email"
              onChange={(e) => this.handleChange('user_search', e.target.value)}
            />
            <button>Search users</button>
          </div>
            <div className="communityusers">
            {mappedUsers}
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
 
export default connect(mapStateToProps, mapDispatchToProps)(Community);