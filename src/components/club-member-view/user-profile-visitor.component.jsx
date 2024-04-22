import { Modal, Button, Card } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import '../../index.css';

export const UserVisit = ({ show, userCloseHandle, user }) => {
  return (
    <Modal show={show} onHide={userCloseHandle} centered>
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        {user ? (
          <Card>
            <div className='profile-visitor-container'>
              <div
                style={{
                  marginRight: 10,
                  marginLeft: 10,
                  marginTop: 5,
                  marginBottom: 5,
                }}
              >
                <img
                  src={user.profilePic}
                  alt='profile'
                  style={{ borderRadius: 25 }}
                />
              </div>
              <div className='profile-visit-body'>
                <h1>{user.username}</h1>
                <p>{user.bio}</p>
              </div>
            </div>
            <div className='profile-visit-emblem'>
              <p>Here will be the emblems when we start with that system</p>
            </div>
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
