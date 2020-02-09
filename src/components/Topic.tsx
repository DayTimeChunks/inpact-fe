import React from "react";
import Campaigns from '../views/Campaigns'
import Profile from '../views/Profile'

function Topic(props: any) {
  // Perhaps need to convert this into a component with props,
  // so as to catch them and forward them like: <Profile user= {this.props.user}/>
  const { user } = props; // contains also history & location 
  const { area } = props.match.params;

  switch (area) {
    case 'campaigns':
        return (
        <div className="container tab-content my-3" id="campaigns">
            <h3>My Campaigns</h3>
            <Campaigns user={user}/>
        </div>);
    case 'contribution':
        return (
        <div className="row">
            <div className="container tab-content my-3" id="contributions">
                <h3>My Contributions</h3>
            </div>
        </div>);
    default:
        return (
        <div className="container tab-content my-3" id="profile">
            <Profile user={user}/>
        </div>);
  }
};

export default Topic;