import React from 'react';
import './App.css';
import { IAppProps, IAppState } from './domain/types';
import Signup from './views/Signup';
import { Redirect, Switch, Route } from 'react-router-dom';
import Login from './views/Login';
import Dashboard from './views/Dashboard';
import Navigation from './views/Navigation'
import * as UsersAPI from './utils/UsersAPI'
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
    }

    public onAuthorization(user: object) {
        this.setState({loggedIn: true, user: user})
    }

    private goToDashboard(props: object){
        return <Dashboard {...props} loggedIn={this.state.loggedIn} user={this.state.user}/>;
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
        console.log("logging out")
        UsersAPI.logout().then(resJson => console.log("logging out object:", resJson));
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
                    <Route path="/login" render={ this.checkCredentialsLogin }/>
                    <Route path="/signup" render={ this.checkCredentialsSignup }/>
                    {/*{this.state.loggedIn &&*/}
                        {/*<Route path="/my-inpact" component={ DashboardTabs }/>*/}
                    {/*}*/}
                    <Route path="/my-inpact/:area" render={ this.goToDashboard }/>
                </Switch>
                {/* <Footer/> */}
            </div>);
    }
}

