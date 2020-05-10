import React from "react";
import Campaigns from '../views/Campaigns'
import Profile from '../views/Profile'
import ProjectDetails from "../views/ProjectDetails";
import ProjectTimeline from "../views/ProjectTimeline";
import ProjectFiles from "../views/ProjectFiles";

function Topic(props: any) {
    // Perhaps need to convert this into a component with props,
    // so as to catch them and forward them like: <Profile user= {this.props.user}/>
    const { user } = props; // contains also history & location 
    const { area } = props.match.params;
    // console.log("Props", props)

    switch (area) {
        case 'campaigns':
            return (
                <div className="container tab-content my-3" id="campaigns">
                    <h3>My Campaigns</h3>
                    <Campaigns user={user} />
                </div>);
        case 'contribution':
            return (
                <div className="row">
                    <div className="container tab-content my-3" id="contributions">
                        <h3>My Contributions</h3>
                    </div>
                </div>);
        case 'profile':
            return (
                <div className="container tab-content my-3" id="profile">
                    <Profile user={user} />
                </div>);
        case 'details': // url: projects/x/details
            return (
                <div className="" id="project-details">
                    <ProjectDetails {...props}/>
                </div>);
        case 'timeline': // url: projects/x/timeline
            return (
                <div className="" id="project-timeline">
                    <ProjectTimeline {...props}/>
                </div>);
        case 'files': // url: projects/x/files
            return (
                <div className="" id="project-timeline">
                    <ProjectFiles {...props}/>
                </div>);
        default:
            return (
                <div className="row">
                    <div className="container tab-content my-3" id="contributions">
                        <h3>My Contributions</h3>
                    </div>
                </div>);
    }
};

export default Topic;