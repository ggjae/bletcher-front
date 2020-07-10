import React, { Component } from 'react';
import axios from 'axios';

import NavBar from 'Components/Main/NavBar';
import SignUpStepper from 'Components/SignUp/SignUpStepper';
import SignUpInfo from 'Components/SignUp/SignUpInfo';
import SignUpProfile from 'Components/SignUp/SignUpProfile';
import SignUpSuccess from 'Components/SignUp/SignUpSuccess';

import { isEmptyString } from 'is-what';

import * as constant from 'Constants/api_uri';

const defaultProps = {};
const propTypes = {};

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpStep: 'infoPage',
      type: '',
      email: '',
      name: '',
      password: '',
      status: '',
      profileImg: null,
    };
  }
  render() {
    const { signUpStep, type, email, name } = this.state;

    return (
      <div className="signUpPage">
        <NavBar isActive="signUp" />
        {signUpStep === 'infoPage' ? (
          <div>
            <SignUpStepper className="signUpPage__step" step={signUpStep} />
            <SignUpInfo
              type={type}
              email={email}
              handleSignUpStep={this.handleSignUpStep}
              handleUserInfo={this.handleUserInfo}
            />
          </div>
        ) : signUpStep === 'profilePage' ? (
          <div>
            <SignUpStepper className="signUpPage__step" step={signUpStep} />
            <SignUpProfile
              handleSignUpStep={this.handleSignUpStep}
              handleUserInfo={this.handleUserInfo}
              handleSignUp={this.handleSignUp}
            />
          </div>
        ) : signUpStep === 'successPage' ? (
          <SignUpSuccess type={type} name={name} />
        ) : null}
      </div>
    );
  }

  handleSignUpStep = (step) => {
    this.setState({ signUpStep: step });
  };

  handleUserInfo = (info) => {
    this.setState(
      {
        type: info.type ? info.type : this.state.type,
        email: info.email ? info.email : this.state.email,
        name: info.name ? info.name : this.state.name,
        password: info.password ? info.password : this.state.password,
        status: info.status ? info.status : this.state.status,
        profileImg: info.profileImg ? info.profileImg : this.state.profileImg,
      },
      () => {
        return !isEmptyString(this.state.name) ? this.handleSignUp() : null;
      },
    );
  };

  handleSignUp = async () => {
    const params = new FormData();
    params.append('email', this.state.email);
    params.append('name', this.state.name);
    params.append('password', this.state.password);
    params.append('status', this.state.status);
    params.append('type', this.state.type === 'Sketcher' ? 0 : 1);
    params.append('img', this.state.profileImg);
    const postSignUp = await axios
      .post(
        process.env.REACT_APP_SERVER_URL +
          constant.INIT_API +
          constant.USERS_API_GET,
        params,
      )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.error(err);
      });
    return postSignUp ? this.handleSignUpStep('successPage') : null;
  };
}

SignUpPage.defaultProps = defaultProps;
SignUpPage.propTypes = propTypes;

export default SignUpPage;
