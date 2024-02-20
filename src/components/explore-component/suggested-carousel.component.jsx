import { Carousel, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import '../../index.css';

export const Suggested = ({ groups }) => {
  const newFiltered = groups
    .sort((a, b) => b.members.length - a.members.length)
    .splice(0, 5);

  return (
    <>
      {!newFiltered.length > 0 ? (
        <div>
          <ClipLoader color='#36D7B7' size={50} />
        </div>
      ) : (
        <div>
          {newFiltered.map((item) => (
            <Link
              to={`/groups/${item.name}`}
              className='removeDecoration'
              key={item.name}
            >
              <Card style={{ marginTop: 7 }}>
                <div className='suggestionsWithImg'>
                  <img
                    src={item.groupImg}
                    alt='group logo'
                    className='profilePic'
                  ></img>
                  <div style={{ width: '60%' }}>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Subtitle>{item.description}</Card.Subtitle>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </>
  );
};

{
  /* <Link to={`/groups/${item.name}`} className='removeDecoration'>
          <Card style={{ marginTop: 7 }}>
            <div className='suggestionsWithImg'>
              <img
                src={item.groupImg}
                alt='group logo'
                className='profilePic'
              ></img>
              <div style={{ width: '60%' }}>
                <Card.Title>{item.name}</Card.Title>
                <Card.Subtitle>{item.description}</Card.Subtitle>
              </div>
            </div>
          </Card>
        </Link> */
}
