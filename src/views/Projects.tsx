import * as React from 'react'
import { IAppState, IProfileProps } from '../domain/types';
import * as ProjectsAPI from '../utils/ProjectsAPI'

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
  project?: { id: string };
}

export default class Projects extends React.Component<IProjectsProps, IProjectState>{

  constructor(props: IProjectsProps) {
    super(props);
    this.state = {
        params: this.props.match ? this.props.match.params : { id : '' },
        loggedIn: this.props.loggedIn,
        user: this.props.user,
    };
  }

  public async componentDidMount(){
    const project = await ProjectsAPI.getProjectById({id : this.state.params.id})
    console.log("project", project)
    this.setState({project})
  }

  public render() {
    // console.log(this.props)
    const url = "/projects";
    return (<div></div>)
  }
}