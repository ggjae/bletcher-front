import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import * as PostAction from 'Redux/post';

import NavBar from 'Components/Common/NavBar';
import Jumbotron from 'Components/Common/Jumbotron';
import Post from 'Components/Post/Post';
import UploadPost from 'Components/Upload/UploadPost';

import dummyPost from 'Dummies/dummyPost';

const defaultProps = {
  token: null,
};

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  token: PropTypes.string,
};

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
    user: state.authReducer.user,
  };
};

class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feed: null,
      feedLoading: true,
      newPostClicked: false,
    };
  }

  componentDidMount() {
    // this.getAllPosts();
  }

  getAllPosts = () => {
    const { dispatch, token } = this.props;
    dispatch(PostAction.getAllPosts(token)).then((result) => {
      this.setState({ feed: result, feedLoading: false });
    });
  };

  toggleNewPost = () => {
    this.setState({ newPostClicked: !this.state.newPostClicked });
  };

  render() {
    const { newPostClicked } = this.state;
    return (
      <div className="mainPage">
        <NavBar isActive="feed" />
        <Jumbotron title="Find out" description="What other peope painted" />
        {newPostClicked ? (
          <UploadPost
            userId={this.props.user.id}
            userProfileImg={this.props.user.profileImgName}
            userType={this.props.user.type}
            handlePrevStep={this.toggleNewPost}
          />
        ) : (
          <div>
            <div className="mainPage__postList">
              {dummyPost.posts.map((data) => {
                return (
                  <Post
                    postId={data.id}
                    postImg={data.postImgName}
                    postTitle={data.postTitle}
                    isFavorite={data.isFavorite}
                    userId={data.UserId}
                    key={data.id}
                    isActive="feed"
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  }
}

MainPage.defaultProps = defaultProps;
MainPage.propTypes = propTypes;

export default connect(mapStateToProps)(MainPage);
