import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

export const MemberList = ({ club }) => {
  const [members, setMembers] = useState(club.members);

  useEffect(() => {
    setMembers(club.members);
  }, [club.members]);

  return (
    <div>
      <h2 style={{ color: 'white' }}>Members</h2>
      {members.length === 0 ? (
        <h2>No current members of this group</h2>
      ) : (
        <>
          {members.map((person) => (
            <Card
              key={person.username}
              className='member-card'
              style={{ marginRight: '1%' }}
            >
              <div>
                <Card.Title>{person.username}</Card.Title>
              </div>
            </Card>
          ))}
        </>
      )}
    </div>
  );
};
