import * as React from 'react'
import { ILoginProps, ILoginState } from '../domain/types';
// import { RouteComponentProps } from "react-router-dom"; // provides access to history through this.props.
import googleIcon from "../assets/icons/Freepik-google.svg"
import { Link } from "react-router-dom";
import * as UsersAPI from '../utils/UsersAPI'

// 3rd party OAuth video series:
// https://www.youtube.com/watch?v=1ND3F8IoZdg&list=PL4cUxeGkcC9jdm7QX143aMLAqyM-jTZ2x&index=21


export default class Login extends React.Component<ILoginProps, ILoginState> {

    private email = React.createRef<HTMLInputElement>();
    private password = React.createRef<HTMLInputElement>();

    constructor(props: ILoginProps){
        super(props);

        this.state = {
            inputError: '',
            google: false
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    public handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let inputError: string;
        const email = this.email.current!.value ? this.email.current!.value : "";
        const password = this.password.current!.value ? this.password.current!.value : "";
        const complete = (!(!email || !password)); // false if either is undefined
        console.log("complete", complete)
        if (!complete){
            inputError = "Email or password are missing";
            this.setState({
                inputError: inputError
            })
        } else {
            UsersAPI.login({
                "email": `${email}`,
                "password": `${password}`
            }).then(user => {
                // if (resJson.status! === 'success') return
                console.log("Returned resJson on login: ", user);

                if (user.statusText === "success"){
                    this.props.userAuthorized(user)

                } else if (user.statusText === "User not found"){
                    this.setState({inputError: "User not found, email or password are incorrect"})

                } else {
                    console.log("Unhandled exception on expected user object: ", user);
                }
            }).catch(err => console.log("error", err));
        }

    };

    public render(){
        return (<section className="py-5 my-5">
            <div className="container py-5">
                <div className="row">
                    <div className="col-md-2"/>
                    <div className="col-md-8">
                        <div className="card text-center p-4">
                            <div className="card-block ">
                                <h4 className="card-title my-2">Log into your account</h4>
                                <p className="card-text my-5 mx-5">Your inPact account is your portal to all projects that you are a
                                    part of, support and collaborate with!</p>
                            </div>
                            <form id="login-form" onSubmit={this.handleSubmit}>
                                <div className="row">
                                    <div className="col">
                                        <input type="text" className="form-control" placeholder="Email*" ref={this.email}/>
                                    </div>
                                </div>
                                <div className="row my-3">
                                    <div className="col">
                                        <input type="password" className="form-control" placeholder="Password*" ref={this.password}/>
                                    </div>
                                </div>
                                {this.state.inputError &&
                                <div className="row my-3">
                                    <div className="col text-danger">
                                        {this.state.inputError}
                                    </div>
                                </div>}
                                <div className="row">
                                    <div className="col-md-12">
                                        <input type="submit" className="btn btn-primary btn-md btn-lg btn-block" value="Sign in"/>
                                    </div>
                                </div>
                            </form>
                            {this.state.google &&
                            <div className="row">
                              <div className="col-md-12 ">
                                <p>or</p>
                                <a href="{{ g_url | safe}}" className="btn btn-outline-secondary btn-lg btn-block" role="button"
                                   aria-pressed="true">
                                  <img className="" src={googleIcon} alt="Google" height="30"
                                       width="30"/> {"g_url_txt"}</a>
                              </div>
                            </div>}

                            <div className="row text-muted">
                                <div className="col-md-12 text-center">
                                    <hr/>
                                    <p>No account yet? <Link to="/signup"> Sign up </Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>)
    }
};
