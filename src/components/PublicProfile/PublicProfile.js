import React, {Component} from 'react';
import axios from 'axios'

class PublicProfile extends Component {
  constructor(props){
    super(props)
    this.state = {
      posts = []
    }

  }

  getProfile(){
    axios.get(`/journal/public/${this.props.match.params.user_id}`)
  }
  render() { 
    return ( 
      <div>

      </div>
     );
  }
}
 
export default PublicProfile;