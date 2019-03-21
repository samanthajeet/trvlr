import React from "react";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { clearUser } from "./../../ducks/reducer";
import "./Navigation.css";

function Nav(props) {
  // let pathname = props.location.pathname
  if (
    props.location.pathname !== "/" &&
    props.location.pathname !== "/login" &&
    props.location.pathname !== "/register"
    // && pathname.match(/public/g) === 'public'
  ) {
    return (
      <div className="Nav">
        <div className="greeting-links">
        <div className="profile-image">
          <img src={props.user_image} alt={props.username} />
        </div>
          <h1>
            <span style={{ color: "#FFAA00" }}>{props.username}</span>
          </h1>
          {props.city ? (
            <div className="location">
              <i class="fas fa-globe-americas" />
              <p>
                {props.city}, {props.country}
              </p>
            </div>
          ) : null}
          <div id="links">
            <div className="nav-links">
              <Link to="/dashboard">home</Link>
              <Link to="/userinfo">account</Link>
              <Link to="/journal">journal</Link>
              <Link to="/community">trvlr community</Link>
              {/* <Link to="/userCommunity">your community</Link> */}
            </div>
          </div>
        </div>

        <button className="logout" onClick={props.logout}>
          Log Out
        </button>
      </div>
    );
  } else {
    return null;
  }
}

const mapStateToProps = reduxState => {
  return reduxState;
};

const mapDispatchtoProps = {
  clearUser
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchtoProps
  )(Nav)
);
