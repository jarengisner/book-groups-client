import { useState } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { CreatePost } from './create-post-modal.component';

export const Posts = ({ user, posts }) => {
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
    <Container>
      <Row>
        <Button onClick={openModal}>create post</Button>
      </Row>
      <>
        {currentPosts.length > 0 ? (
          //Not sure if this is gonna work quite right
          <>
            {currentPosts.map((post) => (
              <h1>This is an example post</h1>
            ))}
          </>
        ) : (
          <Row>
            <h1>Posts are currently empty</h1>
          </Row>
        )}
      </>

      <CreatePost show={show} closeHandle={handleModalClose} user={user} />
    </Container>
  );
};
