import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Navigation } from '../navigation/navigation.component';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const GroupList = ({ user, groups, groupEditSelection }) => {
  const [myGroups, setMyGroups] = useState([]);
  const [memberOfGroups, setMemberOfGroups] = useState([]);

  useEffect(() => {
    const currentUserGroups = groups.filter(
      (group) => group.members[0].username === user.username
    );

    const currentMemberOf = groups.filter(
      (group) =>
        group.members.includes(user.username) &&
        !currentUserGroups.includes(group)
    );
    setMyGroups(currentUserGroups);
    /* setMemberOfGroups(currentMemberOf); */
  }, [groups]);

  return (
    <Container>
      <Row>
        <Col md={8}>
          <h2>Your Groups</h2>
          {myGroups.length > 0 ? (
            myGroups.map((g) => (
              <Card>
                <h1>{g.name}</h1>
                <p>{g.description}</p>
                <div>
                  <Link to='/groups/edit'>
                    <Button onClick={() => groupEditSelection(g)}>
                      Edit Details
                    </Button>
                  </Link>
                </div>
              </Card>
            ))
          ) : (
            <h1>Loading....</h1>
          )}
        </Col>
        <Col md={4}>
          <div style={{ border: '1px solid black' }}>
            <h2>Groups that you're a member of...</h2>
            <p>
              Need to create groups under a different user to test this section
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
