import { Card } from 'react-bootstrap';
import '../../index.css';

export const ClubPreviewInfo = ({ club }) => {
  return (
    <div>
      <Card>
        <img src={club.groupImg} className='profilePic'></img>
        <Card.Title>{club.name}</Card.Title>
        <Card.Subtitle>{club.description}</Card.Subtitle>
        <div>
          <p>This will contain a carousel of the books from the club</p>
        </div>
      </Card>
    </div>
  );
};
