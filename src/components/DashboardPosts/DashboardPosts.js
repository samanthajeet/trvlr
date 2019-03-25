import React, { Component } from "react";
import axios from "axios";
import Avatar from "@material-ui/core/Avatar";
import "./DashboardPosts.css";

class DashboardPosts extends Component {
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
      post_date,
      post_text
    } = this.props;
    return (
      <div className="dashboard-communiytPost">
        <div className="dashboard-author-view">
          <div className="dashboard-authorDetail">
            <Avatar
              src={authorImg}
              alt={author}
              style={{
                marginRight: "0.75rem"
              }}
            />
            <p>{author}</p>
          </div>
          <p>
            {post_city}, {post_country}
          </p>
        </div>
        <div className="dashboard-communitypostimage">
          <img src={image1} alt={title} />
        </div>
        <div className="dashboard-post-text">
          <h3>{title}</h3>
          {/* <p>{post_text}</p> */}
        </div>
        <div className="dashboard-post-bottom">
          <button
            onClick={() => this.props.history.push(`/journal/${post_id}`)}
            >
            view
          </button>
          {this.state.liked ? (
            <div>
              <p>{like_count}</p>
              <button onClick={() => this.unlikePost(post_id)} style={{"border": "none"}} >
                {" "}
                <i class="fas fa-thumbs-up fa-2x" style={{"color": "#ffaa00" }} />
              </button>
            </div>
          ) : (
            <div>
              <p>{like_count}</p>
              <button onClick={() => this.likePost(post_id)} style={{"border": "none"}}>
                {" "}
                <i class="far fa-thumbs-up fa-2x" style={{"color": "#ffaa00" }} />
              </button>
            </div>
          )}
          <p>{post_date}</p>
        </div>
      </div>
    );
  }
}

export default DashboardPosts;
