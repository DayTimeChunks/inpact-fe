import * as React from 'react';
import { Button, Card, Figure, FormControl, Image, InputGroup, ProgressBar, Nav } from 'react-bootstrap';
import { NavLink, Route, Redirect } from 'react-router-dom';
import { IAppState, IProfileProps, IProject } from '../domain/types';
import * as ProjectsAPI from '../utils/ProjectsAPI';
import { roundToDigits } from '../utils/helpers';
import Topic from '../components/Topic';

interface IProjectsProps extends IAppState {
  match?: {
    params: {
      id: string;
    }
  };
}

interface IProjectState {
  params: { id: string };
  loggedIn: boolean;
  user: IProfileProps | object;
  commentBox: string;
  project?: IProject;
}

export default class Projects extends React.Component<IProjectsProps, IProjectState>{

  constructor(props: IProjectsProps) {
    super(props);
    this.state = {
      params: this.props.match ? this.props.match.params : { id: '' },
      loggedIn: this.props.loggedIn,
      user: this.props.user,
      commentBox: "",
    };
    this.renderHeader = this.renderHeader.bind(this);
    this.renderDetails = this.renderDetails.bind(this);
    this.handleComment = this.handleComment.bind(this);

  }
  private commentBox = React.createRef<HTMLInputElement>();

  public async componentDidMount() {
    const project = await ProjectsAPI.getProjectById({ id: this.state.params.id })
    // console.log("project", project)
    this.setState({ project })
  }

  private handleComment() {
    // TODO: post message to backend, update state.
    console.log("message:", this.commentBox)
  }

  private renderHeader() {
    const { project } = this.state
    if (project) {
      const progress = Math.round(((project.raised / project.totalBudget) * 100 * 10) / 10);
      const raised = Math.round(((project.raised) * 10) / 10);
      return (
        <div id={`project-header-${project.id}`} className="py-5 my-3 px-3  white-section">
          <div className="container-fluid border rounded py-3 my-5 project-basic-info">
            <h2 className="dark-gray-text px-3 pt-3">{project.projectTitle}</h2>
            <h3 className="dark-gray-text px-3 pt-3">{project.location}</h3>
            <form onSubmit={this.handleComment}>
              <div className="row ">
                <div className="col-md-6 col-xl-5 py-1 px-3 comment-box">
                  <Image className="" src={require("../assets/img/classes02.jpg")} alt="Project primary image" rounded fluid />
                  <Card className="my-2 text-center">
                    <Card.Body>
                      <div className="container">
                        <div className="row my-3">
                          <div className="col-3 px-1">
                            <Figure className="text-cente px-2">
                              <Figure.Image className="comment-box-icon" src={require("../assets/icons/047-idea.svg")} alt="I like" />
                              <Figure.Caption className="fig-caption-card mx-2">Like!</Figure.Caption>
                            </Figure>
                          </div>
                          <div className="col-3 px-1">
                            <Figure className="text-center px-2">
                              <Figure.Image className="comment-box-icon" src={require("../assets/icons/047-idea.svg")} alt="Add to my projects" />
                              <Figure.Caption className="fig-caption-card mx-2">Follow</Figure.Caption>
                            </Figure>
                          </div>
                          <div className="col-3 px-1">
                            <Figure className="text-center px-2">
                              <Figure.Image className="comment-box-icon" src={require("../assets/icons/047-idea.svg")} alt="Share this project" />
                              <Figure.Caption className="fig-caption-card mx-2">Share</Figure.Caption>
                            </Figure>
                          </div>
                          <div className="col-3 px-1">
                            <Figure className="text-center">
                              <Figure.Image className="comment-box-icon" src={require("../assets/icons/047-idea.svg")} alt="I'm not convinced" />
                              <Figure.Caption className="fig-caption-card mx-2">Know more?</Figure.Caption>
                            </Figure>
                          </div>
                        </div>
                      </div>
                      <ProgressBar variant="success" className="my-2" now={progress} label={`${progress}%`} />
                      <Card.Text>{raised}€ raised</Card.Text>
                      <Button variant="primary">Donate</Button>
                      <InputGroup className="my-3">
                        <FormControl
                          ref={this.commentBox as React.RefObject<any>}
                          type="text"
                          defaultValue={this.state.commentBox}
                          placeholder="Your message to the project holder"
                          aria-label="Your message to the project holder"
                          aria-describedby="commnet-box"
                        />
                        <InputGroup.Append>
                          <Button variant="outline-secondary" onClick={this.handleComment}>Comment</Button>
                        </InputGroup.Append>
                      </InputGroup>
                    </Card.Body>
                  </Card>
                </div>
                <div className="col-md-6 col-xl-3 py-1 px-3">
                  <h4>Summary</h4>
                  <p>{project.summary}</p>
                  <h5>Total budget</h5>
                  <p className="">{roundToDigits(project.totalBudget)}</p>
                </div>
                <div className="col-lg-6 col-xl-4 py-1 px-3">
                  <h4>Project holder</h4>
                  <p>{project.projectHolder.userName}</p>
                  <h4>Development goals</h4>
                </div>
              </div>
            </form>
            {this.renderDetails()}
          </div>

        </div>
      )
    }
  }

  private renderDetails() {
    const { project } = this.state
    if (project) {
      const projectAsProps = { project: {...project}}
      const url = `/projects/${project.id}`;
      return (
        <div id={`project-details`}>
          <Card>
            <Card.Header>
              <Nav variant="tabs" defaultActiveKey="#first">
                <Nav.Item>
                  <NavLink className="nav-link border" to={`${url}/timeline`}>Timeline</NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink className="nav-link border" to={`${url}/details`}>Details</NavLink>
                </Nav.Item>
                <Nav.Item>
                  <NavLink className="nav-link border" to={`${url}/files`}>Files</NavLink>
                </Nav.Item>
              </Nav>
            </Card.Header>
            <Card.Body>
              <Route path={`${url}/:area`} render={(props) => <Topic {...props} {...this.props} { ...projectAsProps } />} />
            </Card.Body>
          </Card>

        </div>
      )
    }
  }

  public render() {
    return (<div>
      <div>{this.renderHeader()}</div>
    </div>
    )
  }
}