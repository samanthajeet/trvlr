import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Dropzone from "react-dropzone";
import { v4 as randomString } from "uuid";
import { GridLoader } from "react-spinners";
import {
  updateUser,
  updateUserInfo,
  updateUserLocation
} from "../../ducks/reducer";
import "./UserInfo.css";

class UserInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_image: this.props.user_image,
      username: this.props.username,
      email: this.props.email,
      city: this.props.city,
      country: this.props.country,
      isUploading: false,
      url: "http://via.placeholder.com/200x200",
      liked_posts: []
    };
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    const { user_id } = this.props;
    if (!user_id) {
      try {
        let response = await axios.get("/auth/isLoggedIn");
        console.log(response.data);
        this.setState({
          user_id: response.data.user_id,
          user_image: response.data.user_image,
          username: response.data.username,
          email: response.data.email,
          city: response.data.city,
          country: response.data.country
        });
        this.props.updateUser(response.data);
      } catch (err) {
        // this.props.history.push('/')
        console.log(err);
      }
    }
  };

  handleChange(prop, val) {
    this.setState({
      [prop]: val
    });
  }

  handleFocus = event => event.target.select();

  updateUserInfo = () => {
    const { user_image, username, city, country } = this.state;
    axios
      .put("/auth/userInfo", { user_image, username, city, country })
      .then(response => {
        console.log(response);
        this.props.updateUser({ user_image, username, city, country });
        this.props.history.push("/dashboard");
      });
  };

  getSignedRequest = ([file]) => {
    this.setState({ isUploading: true });
    // We are creating a file name that consists of a random string, and the name of the file that was just uploaded with the spaces removed and hyphens inserted instead. This is done using the .replace function with a specific regular expression. This will ensure that each file uploaded has a unique name which will prevent files from overwriting other files due to duplicate names.
    const fileName = `${randomString()}-${file.name.replace(/\s/g, "-")}`;

    // We will now send a request to our server to get a "signed url" from Amazon. We are essentially letting AWS know that we are going to upload a file soon. We are only sending the file-name and file-type as strings. We are not sending the file itself at this point.
    axios
      .get("/api/signs3", {
        params: {
          "file-name": fileName,
          "file-type": file.type
        }
      })
      .then(response => {
        const { signedRequest, url } = response.data;
        this.uploadFile(file, signedRequest, url);
      })
      .catch(err => {
        console.log(err);
      });
  };

  uploadFile = (file, signedRequest, url) => {
    const options = {
      headers: {
        "Content-Type": file.type
      }
    };

    axios
      .put(signedRequest, file, options)
      .then(response => {
        this.setState({ isUploading: false, user_image: url });
        // THEN DO SOMETHING WITH THE URL. SEND TO DB USING POST REQUEST OR SOMETHING
      })
      .catch(err => {
        console.log(err);
        this.setState({
          isUploading: false
        });
        if (err) {
          alert(
            `Your request for a signed URL failed with a status 403. Double check the CORS configuration and bucket policy in the README. You also will want to double check your AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY in your .env and ensure that they are the same as the ones that you created in the IAM dashboard. You may need to generate new keys\n${
              err.stack
            }`
          );
        } else {
          alert(`ERROR: ${err.status}\n ${err.stack}`);
        }
      });
  };

  render() {
    const { url, isUploading } = this.state;
    console.log(this.props);
    return (
      <div className="updateuserinfo">
        <div className="updatephoto">
          <fig className="profilephoto">
            <img src={this.state.user_image} alt={this.props.username} />
          </fig>
          <p>your profile photo</p>
        </div>
        <div className="updatetext">
          <p>update city</p>
          <div className="updateCity">
            <input
              type="text"
              value={this.state.city}
              onChange={e => this.handleChange("city", e.target.value)}
              onFocus={this.handleFocus}
            />
          </div>
          <p>update country</p>
          <div className="updateCity">
            <input
              type="text"
              value={this.state.country}
              onChange={e => this.handleChange("country", e.target.value)}
              onFocus={this.handleFocus}
            />
          </div>

          <p>update username</p>
          <input
            placeholder="username"
            value={this.state.username}
            onChange={e => this.handleChange("username", e.target.value)}
            onFocus={this.handleFocus}
          />
          {/* 
          <p>update email address</p>
          <input
            placeholder="email"
            value={this.state.email}
            onFocus={this.handleFocus}
          /> */}
          <p>update profile photo</p>

          <Dropzone
            onDropAccepted={this.getSignedRequest}
            style={{
              position: "relative",
              width: "20rem",
              height: "5rem",
              borderWidth: 1,
              borderColor: "#FFAA00",
              borderStyle: "dashed",
              borderRadius: 5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 28,
              marginTop: "0.75rem",
              marginBottom: "0.75rem"
            }}
            accept="image/*"
            multiple={false}
          >
            {isUploading ? <GridLoader /> : <p>Drop File or Click Here</p>}
          </Dropzone>
          <p>upload image above or insert image url below</p>
          <input
            type="text"
            value={this.state.user_image}
            onChange={e => this.handleChange("user_image", e.target.value)}
            onFocus={this.handleFocus}
          />
          <button onClick={this.updateUserInfo}>Update Info</button>
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
  updateUserInfo,
  updateUserLocation
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserInfo);
