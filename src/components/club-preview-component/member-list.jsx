import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

export const MemberList = ({ club }) => {
  const [members, setMembers] = useState([]);

  /* useEffect(() => {
    let membersToPush = [];
    if (memberHolster.length > 0) {
      club.members.forEach((member) => {
        let userToFind = member.username;
        fetch(`http://localhost:3000/users/${userToFind}`)
          .then((res) => res.json())
          .then((data) => {
            membersToPush.push(data);
          })
          .catch((err) => {
            console.log(err);
            console.log('Error when fetching members of this club');
          });
      });
      setMembers(membersToPush);
    } else {
      setMembers([]);
    }
  }, []); */

  useEffect(() => {
    setMembers(club.members);
    console.log(members);
  }, []);

  return (
    <div>
      {members.length === 0 ? (
        <h2>No current members of this group</h2>
      ) : (
        <>
          {members.map((person) => (
            <Card>
              <img src={person.profilePic} alt='profile'></img>
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
