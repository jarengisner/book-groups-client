import { useState } from 'react';
import { Container, Button, Row, Col, Card } from 'react-bootstrap';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CreatePost } from './create-post-modal.component';
import moment from 'moment';

//style
import '../../index.css';

export const Posts = ({ user, posts, groupname }) => {
  const [currentPosts, setCurrentPosts] = useState([]);
  const [show, setShow] = useState(false);

  const openModal = () => {
    setShow(true);
  };

  const handleModalClose = () => {
    setShow(false);
  };

  useEffect(() => {
    setCurrentPosts(posts);
  }, [posts]);

  return (
    <Container className='postDiv'>
      <Row>
        <Button onClick={openModal}>create post</Button>
      </Row>
      <div>
        {currentPosts.length > 0 ? (
          posts.map((post) => (
            <Row>
              <Card>
                {post.postImg ? <img src={post.postImg} alt='Po' /> : null}
                <div className='post-content'>
                  <p>{post.postUser}</p>
                  <p>{post.postBody}</p>
                  <p>{moment(post.date).format('MM/DD/YYYY')}</p>
                </div>
              </Card>
            </Row>
          ))
        ) : (
          <p>No posts available</p>
        )}
      </div>
      <CreatePost
        show={show}
        closeHandle={handleModalClose}
        user={user}
        groupname={groupname}
      />
    </Container>
  );
};
