import React, { Component } from "react";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import "./Community_Posts.css";

class Community_post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false,
      button: "like"
    };
  }

  componentDidMount() {
    this.checkLike();
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
    const {
      title,
      image1,
      authorImg,
      author,
      post_id,
      like_count,
      post_city,
      post_country,
      post_date
    } = this.props;
    return (
      <div className="communiytPost">
        <div className="author-view">
          <div className="authorDetail">
            <Avatar src={authorImg} alt={author} />
            <p>{author}</p>
          </div>
          <p>
            {post_city}, {post_country}
          </p>
        </div>
        <div className="communitypostimage">
          <img src={image1} alt={title} />
        </div>
        <h3>{title}</h3>
        <div className="communiyt-post-bottom">
          <button
            onClick={() => this.props.history.push(`/journal/${post_id}`)}
          >
            view
          </button>
          <div>
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
                  <p>{like_count}</p>
                  <i class="far fa-thumbs-up" />
                </button>
              </div>
            )}
          </div>
          <p>{post_date}</p>
        </div>
      </div>
    );
  }
}

export default Community_post;
