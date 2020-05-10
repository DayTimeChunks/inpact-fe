import * as React from 'react';
import "../styles/timeline.scss";

interface IProjectTimelineProps { }
interface IProjectTimelineState { }

export default class ProjectTimeline extends React.Component<IProjectTimelineProps, IProjectTimelineState> {

  constructor(props: IProjectTimelineProps) {
    super(props);
  }

  private renderTimelineItem(date: string, eventTitle: string, eventText: string) {
    return (
      <li className="timeline-item">
        <div className="timeline-info">
          <span>March 12, 2016</span>
        </div>
        <div className="timeline-marker"></div>
        <div className="timeline-content">
          <h3 className="timeline-title">Event Title</h3>
          <p>Nullam vel sem. Nullam vel sem. Integer ante arcu, accumsan a, consectetuer eget, posuere ut, mauris. Donec orci lectus, aliquam ut, faucibus non, euismod id, nulla. Donec vitae sapien ut libero venenatis faucibus. ullam dictum felis
                            eu pede mollis pretium. Pellentesque ut neque.</p>
        </div>
      </li>
    )
  }

  private renderMilestoneMarker(date: string) {
    return (
      <li className="timeline-item period">
        <div className="timeline-info"></div>
        <div className="timeline-marker"></div>
        <div className="timeline-content">
          <h2 className="timeline-title">April 2016</h2>
        </div>
      </li>
    )
  }

  public render() {
    console.log("Props", this.props)
    return (<div className="container-fluid">
      <div className="row">
        <div className="col-xs-10 col-xs-offset-1 col-sm-12 ">
          <ul className="timeline timeline-centered">
            {this.renderTimelineItem("March 12, 2016", "Event Title", "Text")}
            {this.renderTimelineItem("March 12, 2016", "Event Title", "Text")}

            {this.renderMilestoneMarker("April 2016")}

            {this.renderTimelineItem("March 12, 2016", "Event Title", "Text")}
            {this.renderTimelineItem("March 12, 2016", "Event Title", "Text")}

          </ul>
        </div>
      </div>
    </div>)
  }
}