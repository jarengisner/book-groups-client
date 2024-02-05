import { useState } from 'react';
import { Container, Button, Row, Col, Card, Tabs, Tab } from 'react-bootstrap';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CreatePost } from './create-post-modal.component';
import moment from 'moment';
import { ClipLoader } from 'react-spinners';

import { UserVisit } from './user-profile-visitor.component';

//style
import '../../index.css';

export const Posts = ({ user, posts, groupname }) => {
  const [currentPosts, setCurrentPosts] = useState([]);
  const [show, setShow] = useState(false);
  const [key, setKey] = useState('All');
  const [empty, setEmpty] = useState(false);

  //States used for user profile visit modal
  const [visitTarget, setVisitTarget] = useState(null);
  const [userShow, setUserShow] = useState(false);

  const openModal = () => {
    setShow(true);
  };

  const handleModalClose = () => {
    setShow(false);
  };

  //User preview modal below

  const openUserModal = (event) => {
    const visitTarget = event.target.textContent;
    let userData = {
      username: '',
      bio: '',
      profilePic: '',
    };

    fetch(`http://localhost:8080/users/${visitTarget}`)
      .then((res) => res.json())
      .then((data) => {
        userData.username = data.username;
        userData.bio = data.bio;
        userData.profilePic = data.profilePic;

        setVisitTarget(userData);
      });

    setUserShow(true);
  };

  const userCloseHandle = () => {
    setUserShow(false);
  };

  useEffect(() => {
    setCurrentPosts(posts);
  }, [posts]);

  useEffect(() => {
    setTimeout(() => {
      if (currentPosts.length === 0) {
        setEmpty(true);
      }
    }, 2000);
  }, []);

  return (
    <Container className='postDiv'>
      <Row style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Button onClick={openModal} style={{ width: '50%', marginTop: 15 }}>
          create post
        </Button>
      </Row>
      <Tabs
        id='controlled-tab-example'
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className='mb-3'
      >
        <Tab eventKey='All' title='All Posts'>
          <div>
            {currentPosts.length > 0 ? (
              posts.map((post) => (
                <Row style={{ marginTop: 15, marginBottom: 15 }}>
                  <Card>
                    {post.postImg ? <img src={post.postImg} alt='Po' /> : null}
                    <div className='post-content'>
                      <button
                        className='post-user-text'
                        onClick={openUserModal}
                      >
                        {post.postUser}
                      </button>
                      <p>{post.postBody}</p>
                      <p>{moment(post.date).format('MM/DD/YYYY')}</p>
                    </div>
                  </Card>
                </Row>
              ))
            ) : empty ? (
              <h1>Group has no posts</h1>
            ) : (
              <div>
                <ClipLoader color='#36D7B7' size={50} />
              </div>
            )}
          </div>
        </Tab>
        <Tab eventKey='User' title='My Posts'>
          <div>
            {currentPosts
              .filter((post) => post.postUser === user.username)
              .map((filteredPost) => (
                <Row style={{ marginTop: 15, marginBottom: 15 }}>
                  <Card>
                    {filteredPost.postImg ? (
                      <img src={filteredPost.postImg} alt='Po' />
                    ) : null}
                    <div className='post-content'>
                      <button
                        className='post-user-text'
                        onClick={openUserModal}
                      >
                        {filteredPost.postUser}
                      </button>
                      <p>{filteredPost.postBody}</p>
                      <p>{moment(filteredPost.date).format('MM/DD/YYYY')}</p>
                    </div>
                  </Card>
                </Row>
              ))}
          </div>
        </Tab>
      </Tabs>
      <CreatePost
        show={show}
        closeHandle={handleModalClose}
        user={user}
        groupname={groupname}
      />

      <UserVisit
        userCloseHandle={userCloseHandle}
        show={userShow}
        user={visitTarget}
      />
    </Container>
  );
};
