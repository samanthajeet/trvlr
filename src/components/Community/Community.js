import React, {Component} from 'react';
import axios from 'axios';
import CommunityPost from '../Community Posts/Community_Post';
import CommunityUsers from '../Community Members/CommunityMembers'

import './Community.css'


class Community extends Component {
  constructor(props){
    super(props);
    this.state = {
      communityPosts: [],
      users: [],
      search: '',
      communityView: 'posts',
    }
  }

  componentDidMount(){
    this.getCommunityPosts();
    this.getUsers();
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

  changeCommunityView(val) {
    this.setState({
      communityView: val
    })
  }
  
  render() { 
    console.log(this.state.users)
    let mappedUsers = this.state.users.map( user => {
      return (
        <div key={user.user_id}>
          <CommunityUsers
            username={user.username}
            user_image={user.user_image}
          />

        </div>
      )
    })

    console.log({mappedUsers})
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


    return ( 
      <div>
        <h2>
          <span className="trvlr" > trvlr </span>
          community
        </h2>
        <button onClick={() => this.changeCommunityView('posts')} >posts</button>
        <button onClick={() => this.changeCommunityView('people')} >people</button>
        <div className='search-posts'>
          <input
            type="text"
            placeholder="search post titles"
            onChange={(e) => this.handleChange('search', e.target.value)}
          />
          <button onClick={this.searchByTitle} >Search</button>
          <button onClick={this.getCommunityPosts} >Reset Search</button>
        </div>
        {this.state.communityView === 'posts' ? (
          <div className="community-posts">{mappedPosts}</div>
        ): (
          <div>{mappedUsers}</div>
        ) }

        </div>
     );
  }
}
 
export default Community;