import * as React from 'react'
import { IDashboardProps, IDashboardState } from '../domain/types';
import { NavLink, Route, Redirect } from 'react-router-dom';
import { Nav } from "react-bootstrap";
import Topic from '../components/Topic';

export default class Dashboard extends React.Component<IDashboardProps, IDashboardState> {

  constructor(props: IDashboardProps){
      super(props); // carries also default objects: history, location, etc. (not yet defined in props' type)
    //   this.state = {
    //       params: this.props.match.params
    //   };
      this.loadTabView = this.loadTabView.bind(this)
  }

  private loadTabView() {
      const { loggedIn } = this.props
      if (loggedIn) {
          const url = "/my-inpact";
          return (
              <div id="my-inpact" className="py-5 my-3 white-section">
                  <div className="container border rounded my-3">
                  <div className="text-light text-center">
                      <div className="row mt-3 ml-3">
                          <h2 className="dark-gray-text">Dashboard</h2>
                      </div>
                      <div className="row border-bottom">
                          <Nav fill={true} variant="tabs">
                              <Nav.Item className="nav-item ml-3">
                                  <NavLink className="nav-link border" to={`${url}/profile`} >Profile</NavLink>
                              </Nav.Item>
                              <Nav.Item className="nav-item ml-1">
                                  <NavLink className="nav-link border" to={`${url}/campaigns`}>My Campaigns</NavLink>
                              </Nav.Item>
                              {/*<Nav.Item className="nav-item">*/}
                                  {/*<NavLink className="nav-link border" to={`${url}/contribution`}>My contributions</NavLink>*/}
                              {/*</Nav.Item>*/}
                          </Nav>
                      </div>
                  </div>
                  {/*<Route path={`${url}/:area`} component={Topic} {...this.props} />*/}
                  <Route path={`${url}/:area`} render={(props) => <Topic {...props} {...this.props}/>} />
                  </div>
              </div>
          )
      }
      return <Redirect to="/login"/>;
  };

  public render(){
      return (<div>
          {this.loadTabView()}
      </div>)
  }
}