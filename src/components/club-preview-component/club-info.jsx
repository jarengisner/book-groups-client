import { Button, Card } from 'react-bootstrap';
import '../../index.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ClubPreviewInfo = ({ club, user }) => {
  const name = club.name;
  const userId = user.username;

  const navigate = useNavigate();

  /*
  
  Here we are actually going to make sure that we navigate to our 'members' page instead of just reloading the same 'preview' page
  
  */
  const joinHandle = () => {
    fetch(`http://localhost:8080/clubs/join/${name}/${userId}`, {
      method: 'PUT',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        navigate(`/groups/${name}`);
      })
      .catch((err) => {
        console.log(err);
        console.log('There was an error when joining the group');
      });
  };

  const leaveHandle = () => {
    fetch(`http://localhost:8080/clubs/${name}/${userId}/leave`, {
      method: 'PUT',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        console.log('There was an error leaving the group');
      });
  };

  return (
    <div>
      <Card className='preview-member-info-card'>
        <div className='preview-info-inner-container'>
          <div className='preview-img-container'>
            <img src={club.groupImg} className='club-info-pic' alt='pic'></img>
          </div>
          <div className='preview-name-desc'>
            <Card.Title className='preview-text-inner'>{club.name}</Card.Title>
            <Card.Subtitle className='preview-text-inner'>
              {club.description}
            </Card.Subtitle>
          </div>
        </div>
        <div>
          <>
            {!club.members.some((member) => member.username === userId) ? (
              <Button
                style={{ width: '33%' }}
                variant='outline-dark'
                onClick={joinHandle}
              >
                Join
              </Button>
            ) : (
              <Button
                variant='danger'
                style={{ width: '33%', marginBottom: '1%' }}
                onClick={leaveHandle}
              >
                Leave Group
              </Button>
            )}
          </>
        </div>
      </Card>
    </div>
  );
};
