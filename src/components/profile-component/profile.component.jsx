import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import '../profile-component/profile.styles.css';
import { useState } from 'react';
import { useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faCrown } from '@fortawesome/free-solid-svg-icons';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
import { EditProfile } from './profile-editing.component';

export const Profile = ({ user, onLogout, groupSuggestions, syncUser }) => {
  const [groups, setGroups] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [currentBio, setCurrentBio] = useState(user.bio);
  const [currentUserPic, setCurrentUserPic] = useState(user.profilePic);
  const [userPosts, setUserPosts] = useState([]);

  //useEffect get all groups user is involved in and also their posts
  useEffect(() => {
    const groups = groupSuggestions;
    const filteredGroups = groups.filter((group) => {
      return group.members.some((member) => member.username === user.username);
    });

    setGroups(filteredGroups);

    const userPostResults = filteredGroups.map((group) => {
      return {
        name: group.name,
        posts: group.posts.filter((post) => post.postUser === user.username),
      };
    });
    setUserPosts(userPostResults.filter((obj) => obj.posts.length > 0));
  }, [groupSuggestions, user.username]);

  const showMenu = () => {
    if (showEdit === false) {
      setShowEdit(true);
    } else {
      setShowEdit(false);
    }
  };

  //refresh handlers simply refresh the bio and picture to create the illusion of immediate update
  const refreshUserBioAfterChanges = (bio) => {
    setCurrentBio(bio);
  };

  const refreshUserPicAfterChanges = (source) => {
    setCurrentUserPic(source);
  };

  return (
    <Container fluid>
      <Row>
        {/* Left Content */}
        <Col md={8}>
          {/* First Component */}
          <div className='content-box'>
            <div className='d-flex justify-content-center'>
              {/* <div className='profile-pic-div'></div> */}
              <div className='name-bio-div'>
                <img
                  src={
                    currentUserPic
                      ? currentUserPic
                      : 'https://placehold.co/100x100?text=Hi!'
                  }
                  alt='prof'
                  className='profile-img'
                ></img>
                <h2>{user.username}</h2>
                <p>{currentBio}</p>
              </div>
            </div>
            {/* need to make following section it's own individual component */}
            <div className='award-container'>
              {groups.length > 0 ? (
                <div className='individual-award-box'>
                  <FontAwesomeIcon icon={faCrown} className='icon-styling' />
                  <p className='icon-label'>Group Creator</p>
                </div>
              ) : null}
              {userPosts.length > 0 ? (
                <div className='individual-award-box'>
                  <FontAwesomeIcon icon={faPencil} className='icon-styling' />
                  <p className='icon-label'>First Post</p>
                </div>
              ) : null}
            </div>
            <div className='profile-badge-container'>
              <button className='edit-button' onClick={() => showMenu()}>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className='edit-button-icon'
                />
              </button>
            </div>
            <Button variant='outline-danger' onClick={onLogout}>
              Logout
            </Button>
          </div>

          {/* Second Component */}
          <div className='content-box'>
            <h2>Recent Posts</h2>
            <div>
              {userPosts.map((postObj) => (
                <Card className='my-posts-card'>
                  <div className='post-card-header'>
                    <Card.Title className='my-posts-group-title'>
                      {postObj.name}
                    </Card.Title>
                  </div>
                  {postObj.posts.map((post) => (
                    <div className='post-content-container'>
                      <p className='my-post-date'>{JSON.parse(post.date)}</p>
                      <p className='my-post-body'>{post.postBody}</p>
                    </div>
                  ))}
                </Card>
              ))}
            </div>
          </div>
        </Col>

        {/* Right Side Panel */}
        <Col md={4} className='side-panel'>
          {showEdit ? (
            <EditProfile
              user={user}
              refreshUserBioAfterChanges={refreshUserBioAfterChanges}
              refreshUserPicAfterChanges={refreshUserPicAfterChanges}
              syncUser={syncUser}
              showMenu={showMenu}
            />
          ) : (
            <>
              <div className='content-box-right'>
                <h2>My groups</h2>
              </div>
              <div className='my-group-profile-container'>
                {groups.map((group) => {
                  return (
                    <Card className='profile-side-component-card'>
                      <h3>{group.name}</h3>
                      <p>{group.desc}</p>
                    </Card>
                  );
                })}
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};
