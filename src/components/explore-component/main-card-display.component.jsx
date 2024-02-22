import { Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const CardDisplay = ({ groups, filter }) => {
  console.log(groups, filter);
  const filteredGroups =
    filter === 'All'
      ? groups
      : groups.filter((group) => group.tags.includes(filter));

  return (
    <>
      {filteredGroups.length > 0 ? (
        filteredGroups.map((item) => (
          <Link
            to={`/groups/${item.name}`}
            className='removeDecoration'
            key={item.name}
          >
            <Card style={{ margin: 7 }}>
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
        ))
      ) : (
        <h1>No groups match the selected filter.</h1>
      )}
    </>
  );
};
