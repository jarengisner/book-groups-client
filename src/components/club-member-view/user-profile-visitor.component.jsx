import { Modal, Button, Card } from 'react-bootstrap';
import { useState } from 'react';
import { ClipLoader } from 'react-spinners';

export const UserVisit = ({ show, userCloseHandle, user }) => {
  return (
    <Modal show={show} onHide={userCloseHandle} centered>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        {user ? (
          <Card>
            <h1>{user.username}</h1>
            <h2>{user.bio}</h2>
            <p>Here will be the emblems when we start with that system</p>
          </Card>
        ) : (
          <div>
            <ClipLoader color='#36D7B7' size={50} />
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={userCloseHandle}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
