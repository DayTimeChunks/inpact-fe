import React from 'react';
import './App.css';
import { IAppProps, IAppState } from './domain/types';
import Signup from './views/Signup';
import { Redirect, Switch, Route } from 'react-router-dom';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import Navigation from './views/Navigation'
import * as UsersAPI from './utils/UsersAPI'
import AddCampaign from './views/AddCampaign';
// import { Footer } from 

export default class App extends React.Component<IAppProps, IAppState> {
    constructor(props: IAppProps){
      super(props);

      this.state = {
          loggedIn: false,
          user: {}
      };

      this.goToDashboard = this.goToDashboard.bind(this);
      this.checkCredentialsSignup = this.checkCredentialsSignup.bind(this);
      this.checkCredentialsLogin = this.checkCredentialsLogin.bind(this);
      this.onAuthorization = this.onAuthorization.bind(this)
      this.goToProjectSubsmission = this.goToProjectSubsmission.bind(this)
    }
      
    public onAuthorization(user: object) {
        this.setState({loggedIn: true, user: user})
    }

    private goToDashboard(props: object){
        return <Dashboard {...props} loggedIn={this.state.loggedIn} user={this.state.user}/>;
    }

    private goToProjectSubsmission(props: object) {
        console.log()
        // return <AddCampaign {...props} loggedIn={this.state.loggedIn}/>
        return <AddCampaign {...props} loggedIn={true}/>
    }

    private checkCredentialsSignup() {
        if (this.state.loggedIn){
            return <Redirect to="/my-inpact/profile"/>;
        } else {
            return <Signup userAuthorized={this.onAuthorization}/>;
        }
    };

    private checkCredentialsLogin() {
        if (this.state.loggedIn){
            return <Redirect to="/my-inpact/profile"/>; // TODO: redirect to live-stream
        } else {
            return <Login userAuthorized={this.onAuthorization}/>;
        }
    };

    public logOut = () => {
        UsersAPI.logout().then(resJson => console.log("Backend logout status:", resJson));
        this.setState({
            loggedIn: false,
            user: {}
        })
    };

    public render() {
        return (
            <div>
                <Navigation loggedIn={this.state.loggedIn} onLogOut={this.logOut}/>
                <Switch>
                    {/* <Route exact={true} path="/" component={Landing}/> */}
                    {/* this.checkCredentialsLogin  OR this.goToProjectSubsmission */}
                    <Route path="/login" render={ this.goToProjectSubsmission  }/> 
                    <Route path="/signup" render={ this.checkCredentialsSignup }/>
                    {/*{this.state.loggedIn &&*/}
                        {/*<Route path="/my-inpact" component={ DashboardTabs }/>*/}
                    {/*}*/}
                    <Route path="/my-inpact/:area" render={ this.goToDashboard }/>
                    <Route path="/project-submission" render={ this.goToProjectSubsmission } />
                    {/* {this.state.loggedIn &&                        
                    } */}
                </Switch>
                {/* <Footer/> */}
            </div>);
    }
}

