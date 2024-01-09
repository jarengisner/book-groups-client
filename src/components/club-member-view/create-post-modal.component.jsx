import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import moment from 'moment';

export const CreatePost = ({ show, closeHandle, user, groupname }) => {
  const [postBody, setPostBody] = useState('');
  const [postImgUrl, setPostImgUrl] = useState('');
  const [currentUser, setUser] = useState(user);

  const userId = user.username;

  const handlePostSubmit = () => {
    const date = new Date();

    date = moment(date).format('MM/DD/YYYY');

    const postData = {
      post: {
        postUser: userId,
        imgUrl: postImgUrl,
        postBody: postBody,
        date: JSON.stringify(date),
      },
    };

    fetch(`http://localhost:8080/clubs/${groupname}/posts`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });

    closeHandle();
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
