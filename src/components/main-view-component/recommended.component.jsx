import { useEffect, useState } from 'react';
import { Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../../index.css';

export const Recommendation = ({ groups }) => {
  const [filteredGroups, setFilteredGroups] = useState([]);

  useEffect(() => {
    let currentFiltered = groups
      .sort((a, b) => b.members.length - a.members.length)
      .slice(0, 5);

    setFilteredGroups(currentFiltered);
  }, [groups]);

  return (
    <>
      {filteredGroups.length > 0 ? (
        <>
          {filteredGroups.map((group) => (
            <Link
              to={`/groups/${group.name}`}
              className='removeDecoration'
              key={group.name}
            >
              <Card style={{ margin: 7 }} className='main-view-card'>
                <div className='suggestionsWithImg'>
                  <img
                    src={group.groupImg}
                    alt='group logo'
                    className='profilePic'
                  ></img>
                  <div style={{ width: '60%' }}>
                    <Card.Title>{group.name}</Card.Title>
                    <Card.Subtitle>{group.description}</Card.Subtitle>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </>
      ) : (
        <h1>Loading......</h1>
      )}
    </>
  );
};
