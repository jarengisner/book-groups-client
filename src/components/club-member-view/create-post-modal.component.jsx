import { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import moment from 'moment';

export const CreatePost = ({ show, closeHandle, user, groupname }) => {
  const [postBody, setPostBody] = useState('');

  const userId = user.username;

  const handlePostSubmit = () => {
    let date = new Date();

    date = moment(date).format('MM/DD/YYYY');
    const randomNum = Math.random();
    const scaledRandomNum = Math.floor(randomNum * 1000);

    const postData = {
      post: {
        postUser: userId,
        postBody: postBody,
        date: JSON.stringify(date),
        likes: 0,
        likedBy: [],
        id: `${userId}${scaledRandomNum}`,
      },
    };

    fetch(
      `https://groups-api-6de9bfaff2b7.herokuapp.com/clubs/${groupname}/posts`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log('Successful Post');
      });

    closeHandle();
  };

  return (
    <Modal show={show} onHide={closeHandle} centered>
      <Modal.Header closeButton>
        <Modal.Title>New Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId='postText'>
            {/* change this to a drag and drop area */}
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
