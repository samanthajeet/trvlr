import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import ReactLoading from "react-loading";
// import { Parallax } from "react-scroll-parallax";
import "./Post.css";

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      post: [],
      userIdMatch: false,
      liked: false,
      button: "like"
    };
  }

  componentWillMount() {
    this.getPost();

    // this.checkUserIdMatch()
  }

  getPost() {
    axios.get(`/journal/${this.props.match.params.post_id}`).then(response => {
      this.setState({
        post: response.data,
        loading: false
      });
    });
    this.checkLike();
  }

  checkLike = async () => {
    try {
      let response = await axios.get(
        `/community/likePost/checkLikes/${this.props.match.params.post_id}`
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
    axios.post(`/community/likePost/${this.props.match.params.post_id}`);
    this.setState({
      liked: true
    });
  }

  unlikePost(post_id) {
    axios.delete(`/community/unlikePost/${this.props.match.params.post_id}`);
    this.setState({
      liked: false
    });
  }
  // checkUserIdMatch = () => {
  //   if(this.post.user_id === this.props.user_id){
  //     this.setState({
  //       userIdMatch: true
  //     })
  //   }
  // }

  render() {
    const {
      post_title,
      post_text,
      post_image1,
      username,
      post_id,
      user_image,
      post_date
    } = this.state.post;
    console.log(this.state.post);
    return (
      <div className="post-landing">
        {this.state.loading ? (
          <div className="loading">
            <ReactLoading type="spinningBubbles" color="#FFAA00" />
          </div>
        ) : (
          <div className="post-container">
            <div className="post">
              <p>{post_date}</p>
              <h1>{post_title}</h1>
              <div className="author">
                <Avatar
                  src={user_image}
                  alt={username}
                  style={{
                    marginRight: "0.75rem",
                    width: "2rem",
                    height: "2rem"
                  }}
                />
                <h4>by {username}</h4>
              </div>
              <div className="post-btns">
                <button onClick={() => window.history.back()}>go back </button>
                {this.state.liked ? (
                  <div className="comm-like">
                    {/* <p>{like_count}</p> */}
                    <button onClick={() => this.unlikePost(post_id)}>
                      <i class="fas fa-thumbs-up" />
                    </button>
                  </div>
                ) : (
                  <div>
                    <button onClick={() => this.likePost(post_id)}>
                      {/* <p>{like_count}</p> */}
                      <i class="far fa-thumbs-up" />
                    </button>
                  </div>
                )}
              </div>
              <div className="post-content">
              <div className="postimage">
                <img src={post_image1} alt={post_title} />
              </div>

              <div
                dangerouslySetInnerHTML={{ __html: post_text }}
                className="post-text"
              />
            </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapSTateToProps = reduxState => {
  return reduxState;
};

export default connect(mapSTateToProps)(Post);
