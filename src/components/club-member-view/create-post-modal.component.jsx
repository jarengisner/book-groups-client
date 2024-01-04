import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export const CreatePost = ({ show, closeHandle, user }) => {
  const [postBody, setPostBody] = useState('');
  const [postImgUrl, setPostImgUrl] = useState('');
  const [currentUser, setUser] = useState(user);

  const handlePostSubmit = () => {
    //plaehold
  };

  return (
    <Modal show={show} onHide={closeHandle}>
      <Modal.Header closeButton>
        <Modal.Title>New Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId='postText'>
            {/* change this to a drag and drop area */}
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              as='textarea'
              rows={1}
              value={postImgUrl}
              onChange={(e) => setPostImgUrl(e.target.value)}
            />
            <Form.Label>Post Text</Form.Label>
            <Form.Control
              as='textarea'
              rows={3}
              value={postBody}
              onChange={(e) => setPostBody(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={closeHandle}>
          Close
        </Button>
        <Button variant='primary' onClick={handlePostSubmit}>
          Submit Post
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
