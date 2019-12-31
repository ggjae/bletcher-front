import React, { Component } from "react";
import axios from "axios";
import { NavBar, TypeButton, SignupInput, MainButton } from "../../Components";

import Slide from "@material-ui/core/Slide";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from "@material-ui/icons/Person";
import { purple } from "@material-ui/core/colors";

import logo_sketcher from "../../Assets/images/logo_sketcher.png";
import logo_creator from "../../Assets/images/logo_creator.png";
import default_profile from "../../Assets/images/default_profile.svg";

const defaultProps = {};
const propTypes = {};

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      repassword: "",
      name: "",
      status: "",
      usertype: null,
      profileImg: null,
      profileImgUrl: null,
      infoOpen: false,
      profileOpen: false,
      isInfoNext: false,
      isEmailValid: true,
      isPwdValid: true,
      isRepwdValid: true,
      isNameValid: true,
      isStatusValid: true
    };
  }

  render() {
    const {
      infoOpen,
      profileOpen,
      isInfoNext,
      isEmailValid,
      isPwdValid,
      isRepwdValid,
      isNameValid,
      isStatusValid
    } = this.state;

    let slide_header;

    if (!(infoOpen || profileOpen)) {
      slide_header = (
        <div>
          <p className="signupPage__type-head">Choose your Art type.</p>
        </div>
      );
    } else if (infoOpen & !profileOpen) {
      slide_header = (
        <div className="signupPage__info-head">
          <div className="back">
            <a>
              <NavigateBeforeIcon
                style={{ color: purple[700], fontSize: 60 }}
                onClick={this.handleInfo}
              />
            </a>
          </div>

          <div className="title">
            <p>
              Hello, {this.state.usertype}! <br />
              Enter your personal information.
            </p>
          </div>
        </div>
      );
    } else if (profileOpen) {
      slide_header = (
        <div className="signupPage__info-head">
          <div className="back">
            <a>
              <NavigateBeforeIcon
                style={{ color: purple[700], fontSize: 60 }}
                onClick={this.handleProfile}
              />
            </a>
          </div>
          <div className="title">
            <p>Complete your profile.</p>
          </div>
        </div>
      );
    }
    return (
      <div className="signupPage">
        <NavBar isActive="SignUp" />

        {slide_header}

        <Slide
          direction="up"
          in={!infoOpen}
          timeout={{ appear: 1000, enter: 750, exit: 750 }}
        >
          <div className="signupPage__type">
            <div className="signupPage__type-btn">
              <TypeButton
                title="Sketcher"
                value="sketcher"
                content="Share your artisic idea."
                logo={logo_sketcher}
                onClick={this.handleTypeSketcher}
              />
              <TypeButton
                title="Creator"
                value="sketcher"
                content="Share your creation."
                logo={logo_creator}
                onClick={this.handleTypeCreator}
              />
            </div>
          </div>
        </Slide>

        <Slide
          direction="up"
          in={infoOpen}
          mountOnEnter
          timeout={{ appear: 1000, enter: 750, exit: 750 }}
        >
          <div className="signupPage__info">
            <div className="signupPage__info-input">
              <SignupInput
                label="Email"
                type="email"
                width="210px"
                onChange={this.handleEmailCheck}
                // error={!isEmailValid}
                helperText={isEmailValid ? " " : "Incorrect Email"} //TODO Make helperText return function e.g. {this.handleHelper}
              />
            </div>
            <div className="signupPage__info-input">
              <SignupInput
                label="Password"
                type="password"
                width="210px"
                onChange={this.handlePwdCheck}
                // error={!isPwdValid}
                helperText={isPwdValid ? " " : "Incorrect Password"}
              />
            </div>
            <div className="signupPage__info-input">
              <SignupInput
                label="Re-password"
                type="password"
                width="210px"
                onChange={this.handleRepwdCheck}
                onKeyPress={this.handleEnterKey}
                // error={!isRepwdValid}
                helperText={isRepwdValid ? " " : "Type Same Password"}
              />
            </div>
            <div className="signupPage__info-next">
              <MainButton
                disabled={!isInfoNext}
                text="Next"
                onClick={this.handleProfile}
              />
            </div>
          </div>
        </Slide>
        <Slide
          direction="up"
          in={profileOpen}
          mountOnEnter
          timeout={{ appear: 1000, enter: 750, exit: 750 }}
        >
          <div className="signupPage__info">
            <div className="signupPage__info__img">
              <Avatar
                className="signupPage__info__img-preview"
                src={
                  this.state.profileImgUrl
                    ? this.state.profileImgUrl
                    : default_profile
                }
                style={{ width: "120px", height: "120px" }}
              />
              <div className="signupPage__info__img-upload">
                <input
                  accept="image/*"
                  type="file"
                  style={{ display: "none" }}
                  id="profile-upload"
                  name="img"
                  onChange={this.handleProfileImg}
                />
                <label htmlFor="profile-upload">
                  <MainButton
                    size="small"
                    component="span"
                    text="Choose Image"
                  />
                </label>
              </div>
            </div>
            <div className="signupPage__info-input">
              <SignupInput
                id="standard-basic"
                label="name"
                type="text"
                width="210px"
                onChange={this.handleNameCheck}
                error={!isNameValid}
              />
            </div>
            <div className="signupPage__info-input">
              <SignupInput
                id="standard-basic"
                label="status"
                type="text"
                width="210px"
                onChange={this.handleStatusCheck}
                error={!isStatusValid}
              />
            </div>

            <div className="signupPage__info-signup">
              <MainButton
                text="Sign Up"
                disabled={this.state.name === "" || isNameValid === false}
                onClick={this.handleSignup}
              />
            </div>
          </div>
        </Slide>
      </div>
    );
  }

  handleNameCheck = e => {
    const regExp = /^\S([0-9a-zA-z][\_\.]?){2,29}$/;
    this.setState({ name: e.target.value }, () => {
      if (regExp.test(this.state.name)) {
        // axios
        //   .post("http://127.0.0.1:4000/users/name", { name: this.state.name })
        //   .then(res => {
        //     console.log("available name!");
        this.setState({ isNameValid: true });
        //   })
        //   .catch(err => {
        //     console.log("exist name!");
        // this.setState({ isNameValid: false });
        //   });
      } else {
        this.setState({ isNameValid: false });
      }
    });
  };

  handleEmailCheck = e => {
    const regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    this.setState({ email: e.target.value }, () => {
      this.handleInfoNext();
      if (this.state.email === "" || regExp.test(this.state.email)) {
        this.setState({ isEmailValid: true }, () => {
          this.handleInfoNext();
        });
      } else if ((this.state.email !== "") & !regExp.test(this.state.email)) {
        this.setState({ isEmailValid: false }, () => {
          this.handleInfoNext();
        });
      }

      // if (regExp.test(this.state.email)) {
      //   axios
      //     .post("http://127.0.0.1:4000/users/email", {
      //       email: this.state.email
      //     })
      //     .then(res => {
      //       console.log("available email!");
      //       this.setState({ isEmailValid: true });
      //     })
      //     .catch(err => {
      //       console.log("exist email!");
      //       this.setState({ isEmailValid: false });
      //     });
      // }
    });
  };

  handleSignup = () => {
    const formData = new FormData();
    formData.append("email", this.state.email);
    formData.append("name", this.state.name);
    formData.append("password", this.state.password);
    formData.append("status", this.state.status);
    formData.append("type", this.state.usertype);
    formData.append("img", this.state.profileImg);

    return axios
      .post("http://127.0.0.1:4000/signup", formData)
      .then(res => {
        alert("signup success!");
      })
      .catch(err => {
        alert("signup fail!");
      });
  };

  handleTypeSketcher = () => {
    this.setState({ usertype: "Sketcher" }, () => {
      this.handleInfo();
    });
  };

  handleTypeCreator = () => {
    this.setState({ usertype: "Creator" }, () => {
      this.handleInfo();
    });
  };

  handleInfo = () => {
    this.setState({
      infoOpen: !this.state.infoOpen
    });
  };

  handleProfile = () => {
    this.setState({
      infoOpen: !this.state.infoOpen,
      profileOpen: !this.state.profileOpen
    });
  };

  handleProfileImg = e => {
    this.setState({ profileImg: e.target.files[0] }, () => {
      if (this.state.profileImg) {
        this.setState({
          profileImgUrl: URL.createObjectURL(this.state.profileImg)
        });
      }
    });
  };

  handleEnterKey = e => {
    //TODO Need to add profile enter key case condition (after adding signup function)
    if (
      (e.charCode === 13) &
      (this.state.profileOpen === false) &
      (this.state.isEmailValid &
        this.state.isPwdValid &
        this.state.isRepwdValid)
    ) {
      this.handleProfile();
    }
  };

  handlePwdCheck = e => {
    const regExp = /\S[\*\!0-9a-zA-Z]{7,15}$/;

    this.setState({ password: e.target.value }, () => {
      this.handleInfoNext();
      if (this.state.password === "" || regExp.test(this.state.password)) {
        this.setState({ isPwdValid: true }, () => {
          this.handleInfoNext();
        });
      } else {
        this.setState({ isPwdValid: false }, () => {
          this.handleInfoNext();
        });
      }
    });
  };

  handleRepwdCheck = e => {
    this.setState({ repassword: e.target.value }, () => {
      if (
        this.state.repassword === "" ||
        this.state.password === this.state.repassword
      ) {
        this.setState({ isRepwdValid: true }, () => {
          this.handleInfoNext();
        });
      } else {
        this.setState({ isRepwdValid: false }, () => {
          this.handleInfoNext();
        });
      }
    });
  };

  handleInfoNext = () => {
    if ((this.state.password !== "") & (this.state.repassword !== "")) {
      if (this.state.password === this.state.repassword) {
        this.setState({ isRepwdValid: true });
      } else {
        this.setState({ isRepwdValid: false, isInfoNext: false });
      }
    }
    if (
      (this.state.email !== "") &
      (this.state.password !== "") &
      (this.state.repassword !== "") &
      (this.state.isEmailValid &
        this.state.isPwdValid &
        this.state.isRepwdValid)
    ) {
      this.setState({ isInfoNext: true });
    } else {
      this.setState({ isInfoNext: false });
    }
  };

  handleStatusCheck = e => {
    this.setState({ status: e.target.value }, () => {
      this.setState({ isStatusValid: this.state.status.length <= 100 });
    });
  };
}

SignUpPage.defaultProps = defaultProps;
SignUpPage.propTypes = propTypes;

export default SignUpPage;
