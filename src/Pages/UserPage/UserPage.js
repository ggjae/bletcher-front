import React, { Component } from 'react';

import { connect } from 'react-redux';
import * as PostAction from 'Redux/Actions/PostAction';

import { NavBar, Thumbnail, Post } from 'Components';

import Gallery from 'react-photo-gallery';
import { Modal } from 'reactstrap';

import settingIcon from 'Assets/icons/setting.png';
import * as constant from '../../Constants/api_uri';

const defaultProps = {};
const propTypes = {};

const mapStateToProps = (state) => {
  return {
    token: state.authReducer.token,
    user: state.authReducer.user,
  };
};

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMyPage: false,
      userInfo: null,
      userPostImgs: [],
      selectedPost: null,
      openModal: false,
    };
  }

  componentDidMount = async () => {
    if (this.props.user) {
      await this.setUser();
      await this.getUserPost();
    }
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (
      (this.props.token && this.props.user !== prevProps.user) ||
      prevProps.match.params.username !== this.props.match.params.username
    ) {
      await this.setUser();
      await this.getUserPost();
    }
  };

  render() {
    const {
      isMyPage,
      userInfo,
      userPostImgs,
      selectedPost,
      openModal,
    } = this.state;
    return (
      <div className="userPage">
        <NavBar isActive={isMyPage ? 'user' : null} />
        {userInfo ? (
          <div className="userPage__contents">
            <div className="userPage__contents__header">
              <div className="userPage__contents__header__thumb">
                <Thumbnail
                  size="100"
                  src={
                    userInfo.profileImgName !== null
                      ? `${process.env.REACT_APP_SERVER_URL}image/profile/${userInfo.profileImgName}`
                      : null
                  }
                  type={userInfo.type}
                  userName={userInfo.name}
                />
              </div>
              <div className="userPage__contents__header__profile">
                <div className="userPage__contents__header__profile-name-set">
                  <div className="nameArea">
                    <h1>{userInfo.name}</h1>
                    <div id="nameUnderBar"></div>
                  </div>
                  {isMyPage ? (
                    <div className="settingArea">
                      <img src={settingIcon} alt="setting" />
                    </div>
                  ) : null}
                </div>
                <div className="userPage__contents__header__profile-status">
                  <p>{userInfo.status}</p>
                </div>
                {isMyPage ? (
                  <div className="userPage__contents__header__profile-follow">
                    <div className="followBox">
                      <span className="followTitle">Followers</span>
                      <span id="followerNum">0</span>
                    </div>
                    <div className="followBox">
                      <span className="followTitle">Following</span>
                      <span id="followingNum">0</span>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="userPage__contents__body">
              {userPostImgs.length > 0 ? (
                <Gallery
                  photos={userPostImgs}
                  direction="column"
                  columns={3}
                  margin={5}
                  onClick={this.handleClickPost}
                />
              ) : null}
            </div>
          </div>
        ) : null}

        <div className="userPage__modal">
          {selectedPost ? (
            <Modal
              isOpen={openModal}
              toggle={() => this.setState({ openModal: !openModal })}
              centered={true}
            >
              <Post
                postId={selectedPost.id}
                isMyPost={isMyPage}
                userProfileImg={selectedPost.User.profileImgName}
                userName={selectedPost.User.name}
                userType={selectedPost.User.type}
                postContent={selectedPost.content}
                postHashTags={[
                  { id: 1, tags: 'flower' },
                  { id: 2, tags: 'sunny' },
                ]} //////
                postImg={selectedPost.postImgName}
                postDate={selectedPost.createdAt}
                isLiked={selectedPost.isLiked}
                postLike={selectedPost.likeCount}
                postComments={[
                  { id: 1, author: 'Endrew', comment: 'good job' },
                  { id: 2, author: 'Sdi_dk', comment: 'awesome' },
                ]} //////
              />
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }

  setUser = async () => {
    const { match, user } = this.props;
    if (match.params.username === user.name) {
      this.setState({ userInfo: user, isMyPage: true, userPostImgs: [] });
    } else {
      try {
        const response = await fetch(
          process.env.REACT_APP_SERVER_URL +
            constant.INIT_API +
            constant.USERS_API_GET +
            constant.NAME_API_GET +
            `${match.params.username}`,
          {
            method: 'GET',
          },
        );
        if (response.status === 200) {
          const result = await response.json();
          this.setState({
            userInfo: result.userInfo,
            isMyPage: false,
            userPostImgs: [],
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  getUserPost = async () => {
    const { dispatch, token } = this.props;
    const { userInfo, userPostImgs } = this.state;
    const postImg = [];
    await dispatch(PostAction.getPostByUserId(userInfo.id, token)).then(
      (posts) => {
        posts.forEach((post) => {
          postImg.push({
            src: `${process.env.REACT_APP_SERVER_URL}image/post/${post.postImgName}`,
            width: parseInt(post.postImgWidth),
            height: parseInt(post.postImgHeight),
            key: String(post.id),
          });
        });
      },
    );
    this.setState({ userPostImgs: userPostImgs.concat(postImg) });
  };

  handleClickPost = (e, { photo, index }) => {
    const { dispatch, token } = this.props;
    dispatch(PostAction.getPostByPostId(photo.key, token)).then((post) => {
      this.setState({ selectedPost: post, openModal: true });
    });
  };
}

UserPage.defaultProps = defaultProps;
UserPage.propTypes = propTypes;

export default connect(mapStateToProps)(UserPage);
