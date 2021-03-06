import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import Journal from './components/Journal/Journal';
import NewPost from './components/NewPost/NewPost';
import Post from './components/Post/Post.js';
import Community from './components/Community/Community';
import UserInfo from './components/UserInfo/UserInfo';
import PublicProfile from './components/PublicProfile/PublicProfile';
import EditPost from './components/EditPost/EditPost';
import CommunityMembers from './components/Community Members/CommunityMembers'





export default (
  <Switch>
    <Route path='/' exact component={Landing} />
    <Route path='/login' component={Login} />
    <Route path='/register' component={Register} />
    <Route path='/dashboard' component={Dashboard} />
    <Route path='/newPost' component={NewPost} />
    <Route path='/editPost/:post_id' component={EditPost} />
    <Route path='/journal/:post_id' component={Post} />
    <Route path='/journal' component={Journal} />
    <Route path='/publicProfile/:user_id' component={PublicProfile} />
    <Route path='/communitymembers' component={CommunityMembers} />
    <Route path='/community' component={Community} />
    <Route path='/userinfo' component={UserInfo} />
  </Switch>
)