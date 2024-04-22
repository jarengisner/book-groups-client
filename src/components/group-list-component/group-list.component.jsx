import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Navigation } from '../navigation/navigation.component';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { EditGroups } from './group-editing.component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';

//CSS import
import '../../index.css';

export const GroupList = ({ user, groups, tags, refreshGroupsAfterDelete }) => {
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
  }, [groups]);

  //sets state for group to be edited
  const groupEditSelection = (group) => {
    setSelectedGroup(group);
    setShowEditingMenu(true);
  };

  const closeHandler = () => {
    setShowEditingMenu(false);
  };

  const deleteHandler = (name) => {
    fetch(`https://groups-api-6de9bfaff2b7.herokuapp.com/clubs/${name}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Successfully deleted');
      })
      .catch((err) => console.log(err));

    refreshGroupsAfterDelete(name);
  };

  return (
    <Container>
      {!showEditingMenu ? (
        <div className='my-groups-inner-container'>
          <Row>
            <h2 style={{ color: 'white' }}>Your Groups</h2>
            {myGroups.length > 0 ? (
              myGroups.map((g) => (
                <Col md={6} key={g.name}>
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
                          onClick={() => deleteHandler(g.name)}
                        />
                      </Button>
                    </div>
                  </Card>
                </Col>
              ))
            ) : (
              <h2 className='group-list-no-groups'>
                It appears you don't have any groups to view
              </h2>
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
                  <Card
                    style={{ margin: 20 }}
                    className='my-group-card'
                    key={g.name}
                  >
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
                <h2 className='group-list-no-groups'>
                  It appears you don't have any groups to view
                </h2>
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
