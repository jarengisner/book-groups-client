import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Navigation } from '../navigation/navigation.component';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EditGroups } from './group-editing.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

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

  const closeHandler = () => {
    setShowEditingMenu(false);
  };

  return (
    <Container>
      {!showEditingMenu ? (
        <div className='my-groups-inner-container'>
          <Row>
            <h2 style={{ color: 'white' }}>Your Groups</h2>
            {myGroups.length > 0 ? (
              myGroups.map((g) => (
                <Col md={6}>
                  <Card style={{ margin: 20 }} className='my-group-card'>
                    <div className='my-group-title-caption'>
                      <Card.Title>{g.name}</Card.Title>
                      <Card.Subtitle>{g.description}</Card.Subtitle>
                    </div>
                    <div>
                      <Button
                        onClick={() => groupEditSelection(g)}
                        className='group-edit-open-button'
                      >
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          className='group-edit-open-icon'
                        />
                      </Button>
                      <Button className='delete-group-button' variant='danger'>
                        <FontAwesomeIcon
                          icon={faTrash}
                          className='delete-group-icon'
                        />
                      </Button>
                    </div>
                  </Card>
                </Col>
              ))
            ) : (
              <h1>Loading....</h1>
            )}
          </Row>
        </div>
      ) : (
        <div className='my-groups-inner-container'>
          <Row>
            <Col md={6}>
              <h2 style={{ color: 'white' }}>Your Groups</h2>
              {myGroups.length > 0 ? (
                myGroups.map((g) => (
                  <Card style={{ margin: 20 }} className='my-group-card'>
                    <div className='my-group-title-caption'>
                      <Card.Title>{g.name}</Card.Title>
                      <Card.Subtitle>{g.description}</Card.Subtitle>
                    </div>
                    <div>
                      <Button
                        onClick={() => groupEditSelection(g)}
                        className='group-edit-open-button'
                      >
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          className='group-edit-open-icon'
                        />
                      </Button>
                      <Button className='delete-group-button' variant='danger'>
                        <FontAwesomeIcon
                          icon={faTrash}
                          className='delete-group-icon'
                        />
                      </Button>
                    </div>
                  </Card>
                ))
              ) : (
                <h1>Loading....</h1>
              )}
            </Col>
            <Col md={6}>
              <EditGroups
                group={selectedGroup}
                tags={tags}
                closeHandler={closeHandler}
              />
            </Col>
          </Row>
        </div>
      )}
    </Container>
  );
};
