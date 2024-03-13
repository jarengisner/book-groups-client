import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Navigation } from '../navigation/navigation.component';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EditGroups } from './group-editing.component';

//CSS import
import '../../index.css';

export const GroupList = ({ user, groups, tags }) => {
  const [myGroups, setMyGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showEditingMenu, setShowEditingMenu] = useState(false);

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

  //sets state for group to be edited
  const groupEditSelection = (group) => {
    setSelectedGroup(group);
    setShowEditingMenu(true);
  };

  return (
    <Container>
      {!showEditingMenu ? (
        <div className='my-groups-inner-container'>
          <Row>
            <Col>
              <h2>Your Groups</h2>
              {myGroups.length > 0 ? (
                myGroups.map((g) => (
                  <Card style={{ margin: 20 }}>
                    <Card.Title>{g.name}</Card.Title>
                    <Card.Subtitle>{g.description}</Card.Subtitle>
                    <div>
                      <Button onClick={() => groupEditSelection(g)}>
                        Edit Details
                      </Button>
                    </div>
                  </Card>
                ))
              ) : (
                <h1>Loading....</h1>
              )}
            </Col>
          </Row>
        </div>
      ) : (
        <div className='my-groups-inner-container'>
          <Row>
            <Col md={6}>
              <h2>Your Groups</h2>
              {myGroups.length > 0 ? (
                myGroups.map((g) => (
                  <Card style={{ margin: 20 }}>
                    <Card.Title>{g.name}</Card.Title>
                    <Card.Subtitle>{g.description}</Card.Subtitle>
                    <div>
                      <Button>Edit Details</Button>
                    </div>
                  </Card>
                ))
              ) : (
                <h1>Loading....</h1>
              )}
            </Col>
            <Col md={6}>
              <EditGroups group={selectedGroup} tags={tags} />
            </Col>
          </Row>
        </div>
      )}
    </Container>
  );
};

{
  /* <Container>
      <div className='my-groups-inner-container'>
        <Row>
          <Col>
            <h2>Your Groups</h2>
            {myGroups.length > 0 ? (
              myGroups.map((g) => (
                <Card style={{ margin: 20 }}>
                  <Card.Title>{g.name}</Card.Title>
                  <Card.Subtitle>{g.description}</Card.Subtitle>
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
        </Row>
      </div>
    </Container> */
}
