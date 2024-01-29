import { Modal, Button, Card } from 'react-bootstrap';
import { useState } from 'react';

export const UserVisit = ({ userShow, userCloseHandle, user }) => {
  return (
    <Modal show={userShow} onHide={userCloseHandle} centered>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <Card>
          <h1>{user.username}</h1>
          <h2>{user.bio}</h2>
          <p>Here will be the emblems when we start with that system</p>
        </Card>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={userCloseHandle}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
