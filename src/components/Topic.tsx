import React from "react";
import Campaigns from '../views/Campaigns'
import Profile from '../views/Profile'

function Topic(props: any) {
  // TODO: Perhaps need to convert this into a component with props,
  // so as to catch them and forward them like: <Profile user= {this.props.user}/>
  // const area = match.params.area;
  // console.log("match in Topic", match);
  console.log("props in Topic ", props);
  const { user } = props;
  const { area } = props.match.params;

  switch (area) {
    case 'projects':
        return (
        <div className="container tab-content my-3" id="projects">
            <h3>My Projects</h3>
            <Campaigns/>
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