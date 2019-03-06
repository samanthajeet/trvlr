import React, {Component} from 'react';
import axios from 'axios';
import CommunityPost from '../Community Posts/Community_Post';
import './Community.css'


class Community extends Component {
  constructor(props){
    super(props);
    this.state = {
      communityPosts: [],
      search: ''
    }
  }

  componentDidMount(){
    this.getCommunityPosts()
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
    return ( 
      <div>
        <h2>
          <span className="trvlr" > trvlr </span>
          community
        </h2>
        <div className='search-posts'>
          <input
            type="text"
            placeholder="search post titles"
            onChange={(e) => this.handleChange('search', e.target.value)}
          />
          <button onClick={this.searchByTitle} >Search</button>
          <button onClick={this.getCommunityPosts} >Reset Search</button>
        </div>
        <div className="community-posts">
          {mappedPosts} 
        </div>
      </div>
     );
  }
}
 
export default Community;