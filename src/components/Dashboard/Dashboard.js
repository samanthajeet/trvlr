import React, { Component } from "react";
import { connect } from "react-redux";
import { updateUser, updateUserLocation } from "../../ducks/reducer";
import axios from "axios";
import DashboardPosts from "../DashboardPosts/DashboardPosts";
import DashboardUsers from "../Dashboard Users/DashboardUsers";
import ReactLoading from "react-loading";
import "./Dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friendsPosts: [],
      loading: true,
      weather: "",
      greetings: [
        "Aloha",
        "Hello",
        "Bonjour",
        "Hola",
        "Cio",
        "Shalom",
        "Konnichiwa",
        "Guten Tag",
        "Asalaam alaikum",
        "Nǐ hǎo"
      ],
      randomGreeting: "",
      friends: [],
      friend_search: ""
    };
    this.setFriendSearch = this.setFriendSearch.bind(this);
  }

  componentDidMount() {
    this.getUser();
    this.getFriendsPosts();
    this.randomGreeting();
    this.getFriends();
  }

  getUser = async () => {
    const { user_id } = this.props;
    if (!user_id) {
      try {
        let response = await axios.get("/auth/isLoggedIn");
        this.props.updateUser(response.data);
      } catch (err) {
        this.props.history.push("/");
        console.log(err);
      }
    }
    this.getLocationWeather();
  };

  getLocationWeather = async () => {
    await this.getUserLocation();
    this.getWeather();
  };

  getUserLocation() {
    axios.get(`/location/userlocation`).then(response => {
      this.props.updateUserLocation(response.data);
    });
  }

  getWeather() {
    const { city } = this.props;
    console.log({ city });
    axios.get(`/api/weather/${city}`).then(response => {
      this.setState({
        weather: response.data.main.temp
      });
    });
  }

  getFriends = async () => {
    try {
      let response = await axios.get(`/community/friendList/`);
      this.setState({
        friends: response.data
      });
    } catch (err) {
      console.log(err);
    }
  };

  getFriendsPosts = async () => {
    try {
      let response = await axios.get(`/community/friendPosts`);
      console.log(response.data);
      this.setState({
        friendsPosts: response.data,
        loading: false
      });
    } catch (err) {
      console.log(err);
    }
  };

  setFriendSearch(username) {
    this.setState({
      friend_search: username
    });
  }

  randomGreeting() {
    let randomGreeting = this.state.greetings[
      Math.floor(Math.random() * this.state.greetings.length)
    ];
    this.setState({
      randomGreeting: randomGreeting
    });
  }

  render() {
    // console.log(this.props)
    let mappedPosts = this.state.friendsPosts
      .filter(post => post.username.includes(this.state.friend_search))
      .map(post => {
        return (
          <div key={post.post_id}>
            <DashboardPosts
              title={post.post_title}
              image1={post.post_image1}
              post_text={post.post_text}
              author={post.username}
              authorImg={post.user_image}
              post_id={post.post_id}
              post_date={post.post_date}
              post_country={post.post_country}
              post_city={post.post_city}
              history={this.props.history}
            />
          </div>
        );
      });

    let mappedFriends = this.state.friends.map(friend => {
      return (
        <div key={friend.friend_id}>
          <DashboardUsers
            friend_image={friend.user_image}
            friend_id={friend.friend_id}
            friend_username={friend.username}
            setFriendSearch={this.setFriendSearch}
          />
        </div>
      );
    });

    return (
      <div className="dashboard">
        <h1>
          {this.state.randomGreeting},{" "}
          <span style={{ color: "#FFAA00" }}>{this.props.username}!</span>
        </h1>
        <p>
          The current temperature in {this.props.city} is {this.state.weather}°f
        </p>
        <button onClick={() => this.setState({ friend_search: "" })}>
          unfilter posts
        </button>

        <div className="dashboardPosts">
          {this.state.loading ? (
            <div>
              <h1>Loading</h1>
              <ReactLoading type="spinningBubbles" color="#FFAA00" />
            </div>
          ) : (
            <div className="dashboardcomponents">
              <div className="dashbaordfriends">
                {mappedFriends}
              </div>
              <div className="dashbaordposts">
                {mappedPosts}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchToProps = {
  updateUser,
  updateUserLocation
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
