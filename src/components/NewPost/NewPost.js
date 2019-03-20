import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { updateUser } from "../../ducks/reducer";
import { v4 as randomString } from "uuid";
import Dropzone from "react-dropzone";
import { GridLoader } from "react-spinners";
import Quill from "../Quill/Quill";

import "./NewPost.css";

class NewPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: this.props.user_id,
      post_title: "",
      post_text: "",
      post_image: "",
      now: new Date(),
      isUploading: false,
      url: "http://via.placeholder.com/200x200",
      post_city: '',
      post_country: '',
    };

    this.setText = this.setText.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  getUser = async () => {
    const { user_id } = this.props;
    if (!user_id) {
      try {
        let response = await axios.get("/auth/isLoggedIn");
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    }
  };

  createPost = async () => {
    console.log(this.state);
    const { user_id } = this.props;
    const { post_title, post_text, post_image, post_city, post_country } = this.state;
    let post = { user_id, post_title, post_text, post_image, post_city, post_country };
    try {
      let response = await axios.post("/journal/createPost", post);
      this.props.history.push("/journal");
    } catch (err) {
      console.log(err);
    }
  };

  formatTime() {
    let date = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(this.state.now);
    return date;
  }

  handleChange(prop, val) {
    this.setState({
      [prop]: val
    });
  }

  setText(text) {
    this.setState({
      post_text: text
    });
  }

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
        this.setState({ isUploading: false, post_image: url });
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
    let timestampFormat = new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(this.state.now);

    return (
      <div className="newpost">
        <div className="upperEdit">
          <p>post title</p>
          <input
            type="text"
            placeholder="Post Title"
            onChange={e => this.handleChange("post_title", e.target.value)}
          />
          <p>city</p>
          <input
            type="text"
            placeholder="city"
            onChange={e => this.handleChange("post_city", e.target.value)}
          />
          <p>country</p>
          <input
            type="text"
            placeholder="country"
            onChange={e => this.handleChange("post_country", e.target.value)}
          />
          <p>image</p>
          <input
            type="text"
            placeholder="image_urls"
            onChange={e => this.handleChange("post_image", e.target.value)}
          />
          <Dropzone
            onDropAccepted={this.getSignedRequest}
            style={{
              position: "relative",
              width: 200,
              height: 100,
              borderWidth: 7,
              marginTop: 100,
              borderColor: "blue",
              borderStyle: "solid",
              borderRadius: 5,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 28
            }}
            accept="image/*"
            multiple={false}
          >
            {isUploading ? <GridLoader /> : <p>Drop File or Click Here</p>}
          </Dropzone>
          <img
            src={this.state.post_image}
            alt={this.state.post_title}
            style={{
              "width": "200px",
              "height": "200px"
      
            }}
          />
        </div>
        <div className="Quill">
          <div>
            <p>post</p>
            <Quill setText={this.setText} />
          </div>
          <div>
            <p>{timestampFormat}</p>
          </div>
        </div>
        <div className="newpostbtn">
          <button onClick={this.createPost}>Create New entry</button>
          <button onClick={() => this.props.history.push("/journal")}>
            Cancel
          </button>
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
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewPost);
