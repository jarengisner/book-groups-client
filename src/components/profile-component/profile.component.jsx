import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import '../profile-component/profile.styles.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { Navigation } from '../navigation/navigation.component';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { EditProfile } from './profile-editing.component';

export const Profile = ({ user, onLogout, groupSuggestions }) => {
  //make algorithm to sort out groups that the user is involved in

  const [groups, setGroups] = useState([]);
  const [showEdit, setShowEdit] = useState(false);

  //useEffect is good, but it will filter for groups that you are a member of, make sure that it will provide all the details, etc.
  useEffect(() => {
    const groups = groupSuggestions;
    console.log(groups);
    const filteredGroups = groups.filter((group) => {
      return group.members.some((member) => member.username === user.username);
    });

    setGroups(filteredGroups);
  }, [groupSuggestions, user.username]);

  const showMenu = () => {
    if (showEdit === false) {
      setShowEdit(true);
    } else {
      setShowEdit(false);
    }
  };

  return (
    <Container fluid>
      <Row>
        {/* Left Content */}
        <Col md={8}>
          {/* First Component */}
          <div className='content-box'>
            <div className='d-flex justify-content-space-between'>
              <div className='profile-pic-div'>
                <img src={user.profilePic} alt='prof'></img>
              </div>
              <div className='name-bio-div'>
                <h2>{user.username}</h2>
                <p>{user.bio}</p>
              </div>
            </div>
            <div className='profile-badge-container'>
              <button className='edit-button' onClick={() => showMenu()}>
                <FontAwesomeIcon
                  icon={faPenToSquare}
                  className='edit-button-icon'
                />
              </button>
            </div>
            <Button variant='outline-danger' onClick={onLogout}>
              Logout
            </Button>
          </div>

          {/* Second Component */}
          <div className='content-box'>
            <h2>Component 2</h2>
            <p>Recent Posts</p>
          </div>
        </Col>

        {/* Right Side Panel */}
        <Col md={4} className='side-panel'>
          {showEdit ? (
            <EditProfile user={user} />
          ) : (
            <>
              <div className='content-box'>
                <h2>My groups</h2>
              </div>
              <div className='my-group-profile-container'>
                {groups.map((group) => {
                  return (
                    <Card className='profile-side-component-card'>
                      <h3>{group.name}</h3>
                      <p>{group.desc}</p>
                    </Card>
                  );
                })}
              </div>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};
