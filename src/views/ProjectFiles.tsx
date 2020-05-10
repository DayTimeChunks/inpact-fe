import * as React from 'react';
import { Card, Button } from 'react-bootstrap';

interface IProjectFilesProps {}
interface IProjectFilesState {}

export default class ProjectFiles extends React.Component<IProjectFilesProps, IProjectFilesState> {

  constructor(props: IProjectFilesProps) {
    super(props);
  }

  public render() {
    console.log("Props", this.props)
    return (<div>
      <Card.Title>This is project files</Card.Title>
      <Card.Text>
          With some text
      </Card.Text>
      <Button variant="primary">Go somewhere</Button>
    </div>)
  }
}