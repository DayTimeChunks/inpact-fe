import * as React from 'react'
import { ISignupProps, ISignupState } from '../domain/types';
import * as UsersAPI from '../utils/UsersAPI'

export default class Signup extends React.Component<ISignupProps, ISignupState> {

  private firstName = React.createRef<HTMLInputElement>();
  private lastName = React.createRef<HTMLInputElement>();
  private userEmail = React.createRef<HTMLInputElement>();
  private userPassword = React.createRef<HTMLInputElement>();
  private confirmPassword = React.createRef<HTMLInputElement>();

  constructor(props: any){
      super(props);

      this.state = {
          inputError: '',
          passwordError: '',
          google: false
      };

      this.handleSubmit = this.handleSubmit.bind(this);
  }

  public handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const name = (this.firstName.current && this.firstName.current!.value) ? this.firstName.current!.value : "";
      const lastname = (this.lastName.current && this.lastName.current!.value) ? this.lastName.current!.value : "";
      const email = (this.userEmail.current && this.userEmail.current!.value) ? this.userEmail.current!.value : "";
      const password = (this.userPassword.current && this.userPassword.current!.value) ? this.userPassword.current!.value : "";
      const confirm = (this.confirmPassword.current && this.confirmPassword.current!.value) ? this.confirmPassword.current!.value : "";
      const complete = (!(!name || !lastname || !email || !password || !confirm)); // false if any is undefined
      const match = (password === confirm);

      if (!complete){
          this.setState({
              inputError: "Please complete all fields."
          })
      } else if (!match) {
          if (complete){
              this.setState({
                  inputError: '',
                  passwordError: 'Passwords did not match'
              })
          } else {
              this.setState({
                  passwordError: 'Passwords did not match'
              })
          }

      } else {
          UsersAPI.create({
              "name": `${name}`,
              "lastname": `${lastname}`,
              "email": `${email}`,
              "password": `${password}`
              })
              .then(user => {
                  if (user.statusText === "success"){
                      this.props.userAuthorized(user)

                  } else if (user.status === 400){
                      this.userPassword.current!.value = '';
                      this.confirmPassword.current!.value = '';
                      this.setState({
                          inputError: user.statusText,
                          passwordError: ''
                      });
                  } else {
                      console.log("User was not received from backend as expected, user:", user);
                  }
              })
              .catch(err => console.log("error", err))
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
                              <h4 className="card-title my-2">Create your inPact account</h4>
                              <p className="card-text my-5 mx-5">Your inPact account is your portal to all projects that you are a
                                  part of, support and collaborate with!</p>

                              {this.state.inputError &&
                              <div className="row my-1">
                                <div className="col text-danger">
                                    {this.state.inputError}
                                </div>
                              </div>}

                              <form onSubmit={this.handleSubmit}>
                                  <div className="row">
                                      <div className="col py-3">
                                          <input type="text" className="form-control" placeholder="First Name*" ref={this.firstName}/>

                                      </div>
                                      <div className="col py-3">
                                          <input type="text" className="form-control" placeholder="Last Name*" ref={this.lastName}/>

                                      </div>
                                  </div>

                                  <div className="row">
                                      <div className="col py-3">
                                          <input type="text" className="form-control" placeholder="Email Address*" ref={this.userEmail}/>

                                      </div>
                                  </div>

                                  <div className="row">
                                      <div className="col-md-6 py-3">
                                          <input type="password" className="form-control" placeholder="Password*" ref={this.userPassword}/>

                                      </div>

                                      <div className="col-md-6 py-3">
                                          <input type="password" className="form-control" placeholder="Confirm Password*" ref={this.confirmPassword}/>

                                          {this.state.passwordError &&
                                          <div className="row my-1">
                                            <div className="col text-danger">
                                                {"Passwords did not match"}
                                            </div>
                                          </div>}

                                      </div>
                                  </div>
                                  <button type="submit" className="btn btn-primary btn-lg btn-block">Sign Up</button>
                              </form>
                              {this.state.google &&
                              <div className="row">
                                <div className="col-md-12 text-center">
                                  <p>or</p>
                                  <a href="{{ g_url | safe}}" className="btn btn-outline-secondary btn-lg btn-block" role="button"
                                     aria-pressed="true">
                                    <img className="m-1" src="www/icons/Freepik-google.svg" alt="Google" height="30"
                                         width="30"/> {"g_url_txt"}</a>
                                </div>
                              </div>}

                              <div className="row">
                                  <div className="col-md-12"/>
                              </div>

                          </div>


                      </div>
                  </div>
              </div>
          </div>
      </section>)
  }


}