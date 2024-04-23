import { Button, Card } from 'react-bootstrap';
import '../../index.css';
import { useNavigate } from 'react-router-dom';

export const ClubPreviewInfo = ({ club, user }) => {
  const name = club.name;
  const userId = user.username;

  const navigate = useNavigate();

  //joinHandle will take a club's name and a user's userId and update the groups members with the user
  const joinHandle = () => {
    fetch(
      `https://groups-api-6de9bfaff2b7.herokuapp.com/clubs/join/${name}/${userId}`,
      {
        method: 'PUT',
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log('Success');
        navigate(`/groups/${name}`);
      })
      .catch((err) => {
        console.log(err);
        console.log('There was an error when joining the group');
      });
  };

  //leaveHandle will pull the user out of the group's members array
  const leaveHandle = () => {
    fetch(
      `https://groups-api-6de9bfaff2b7.herokuapp.com/clubs/${name}/${userId}/leave`,
      {
        method: 'PUT',
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log('Success');
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
