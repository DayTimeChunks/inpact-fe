import * as React from 'react'
import { INavProps, INavState } from '../domain/types'
import { ButtonGroup, DropdownButton, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import earthDay from '../assets/icons/earth-day.svg';

export default class Navigation extends React.Component<INavProps, INavState> {

  constructor(props: INavProps){
      super(props)
      this.isLoggedIn = this.isLoggedIn.bind(this)
  }

  public isLoggedIn = () => {
      if (this.props.loggedIn){
          return (
              <ButtonGroup>
                  <DropdownButton  as={ButtonGroup} id="bg-nested-dropdown" title="my inPact" variant="secondary">
                    <NavItem className="ml-3"><NavLink to={`/my-inpact/profile`}>My profile</NavLink></NavItem>
                    <NavItem className="ml-3"><NavLink to={`/my-inpact/campaigns`}>My Campaigns</NavLink></NavItem>
                    <NavItem className="ml-3"><NavLink onClick={this.props.onLogOut}  to={`/my-inpact/login`}>Log out</NavLink></NavItem>
                  </DropdownButton>
              </ButtonGroup>
          )
      }
      return (
      <li className="nav-item">
          <Link className="nav-link mx-1" to="/login">Log in</Link>
      </li>)
  };

  public render(){
      return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
          <div className="container py-1">
              <img className="logo" src={earthDay} alt="inpact logo"/>
              <a className="navbar-brand" href="https://www.people-inpact.com/"
                             target="_blank"
                             rel="noopener noreferrer">inPact</a>

              {/* <Link className="navbar-brand" to="/">inPact</Link> */}
              
              <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive"
                      aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"/>
              </button>
              <div className="collapse navbar-collapse" id="navbarResponsive">
                  <ul className="navbar-nav ml-auto">
                      {/* <li className="nav-item active">
                          <Link className="nav-link mx-1" to="/">Home
                              <span className="sr-only">(current)</span>
                          </Link>
                      </li> */}
                      {/* <li className="nav-item">
                          <Link className="nav-link mx-1" to="/#glance">About</Link>
                      </li>
                      <li className="nav-item">
                          <Link className="nav-link mx-1" to="/#community">Community</Link>
                      </li>
                      <li className="nav-item">
                          <Link className="nav-link mx-1" to="/support">Support</Link>
                      </li>
                      <li className="nav-item">
                          <Link className="nav-link mx-1" to="/#contact">Contact</Link>
                      </li> */}
                      <li className="nav-item">
                          <a className="nav-link mx-1" href="https://adappt3.wixsite.com/inpact/blog-1"
                             target="_blank"
                             rel="noopener noreferrer">Blog</a>
                      </li>
                      {this.isLoggedIn()}
                  </ul>
              </div>
          </div>
      </nav>)
  }
}