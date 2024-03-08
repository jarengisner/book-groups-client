import { Container, Row } from 'react-bootstrap';
import { Navigation } from '../navigation/navigation.component';
import { useState, useEffect } from 'react';

export const GroupList = ({ user, groups }) => {
  const [myGroups, setMyGroups] = useState([]);
  const [memberOfGroups, setMemberOfGroups] = useState([]);

  useEffect(() => {
    const currentUserGroups = groups.filter(
      (group) => group.members[0].username === user.username
    );
    setMyGroups(currentUserGroups);
  }, [groups]);

  return (
    <Container>
      {myGroups.length > 0 ? (
        myGroups.map((g) => <h1>{g.name}</h1>)
      ) : (
        <h1>Loading....</h1>
      )}
    </Container>
  );
};
