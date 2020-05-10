import * as React from 'react';
import { IProject } from '../domain/types';

interface IProjectDetailsProps {
  project: IProject;
}
interface IProjectDetailsState {}

export default class ProjectDetails extends React.Component<IProjectDetailsProps, IProjectDetailsState> {

  constructor(props: IProjectDetailsProps) {
    super(props);
  }

  private renderTextSection() {
    const {
      background, milestones, budget, location,
      organizationName, organizationDescription, organizationWebsite,
      detailedDescription: description,
      projectImpact: impact,
    } = this.props.project;
    return (
      <div className="container-fluid rounded py-3">
        <div className="row">
          <div className="col-6">
            <h4>Project Background</h4>
            <p>{background}</p>
            <h4>Project Description</h4>
            <p>{description}</p>
            <h4>Project Impact</h4>
            <p>{impact}</p>
          </div>
          <div className="col-6">
            <h4>Location</h4>
            <p>{location}</p>
            <h4>Local Partner</h4>
            <p>We did not ask for a local partner to be included in the subission of the project yet.</p>
            <h4>Organization</h4>
            <a href={`https://${organizationWebsite}`} target="_blank" rel="noopener noreferrer">{organizationWebsite}</a>
            <h5>{organizationName}</h5>
            <p>{organizationDescription}</p>
          </div>
        </div>
      </div>
    )
  }

  private renderTimeline() {
    return (
      <div>
        <div className="container-fluid rounded py-3">
          <div className="row">
            TODO: Define when
          </div>
        </div>
      </div>
    )
  }
  private renderBudget() {
    return (
      <div>
        <div className="container-fluid rounded py-3">
          <div className="row"></div>
        </div>
      </div>
    )
  }

  public render() {
    console.log("Props", this.props)
    return (<div>
      {this.renderTextSection()}
    </div>)
  }
}