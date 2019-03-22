import React, {Component} from 'react';
import axios from 'axios';
import {withRouter} from 'react-router-dom';
import { connect } from "react-redux";
import { updateUser } from "../../ducks/reducer";
import Avatar from '@material-ui/core/Avatar';
import CommunityPost from "../Community Posts/Community_Post";
import './PublicProfile.css'

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
    this.getUser();
  }

  getUser = async () => {
    const { user_id } = this.props;
    if (!user_id) {
      try {
        let response = await axios.get("/auth/isLoggedIn");
        this.setState({
          user_id: response.data.user_id
        });
        this.props.updateUser(response.data);
      } catch (err) {
        // this.props.history.push("/");
        console.log(err);
      }
    }
  };

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

    checkLike = async () => {
    try {
      let response = await axios.get(
        `/community/likePost/checkLikes/${this.props.post_id}`
      );
      if (response.data[0]) {
        this.setState({
          liked: true
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  likePost(post_id) {
    axios.post(`/community/likePost/${post_id}`);
    this.setState({
      liked: true
    });
  }

  unlikePost(post_id) {
    axios.delete(`/community/unlikePost/${post_id}`);
    this.setState({
      liked: false
    });
  }

  render() { 
    console.log(this.state.posts)
    let mappedPosts = this.state.posts
    .map(post => {
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
            post_date={post.post_date}
            user_id={post.user_id}
            history={this.props.history}
          />
        </div>
      );
    });
    return ( 
      
      <div className="publicProfile">
        <Avatar src={this.state.user_image} alt={this.state.username} style={{"width": 100, "height": 100}} />


        <h2>
          entries by
          <span className="trvlr" > {this.state.username} </span>
        </h2>
        <div className="publicProfile-posts">

          {mappedPosts}
        </div>
      </div>
     );
  }
}
const mapStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  updateUser
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PublicProfile));