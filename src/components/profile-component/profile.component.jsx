import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import '../profile-component/profile.styles.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { Navigation } from '../navigation/navigation.component';

export const Profile = ({ user, onLogout, groupSuggestions }) => {
  //make algorithm to sort out groups that the user is involved in

  const [groups, setGroups] = useState([]);

  //useEffect is good, but it will filter for groups that you are a member of, make sure that it will provide all the details, etc.
  useEffect(() => {
    const groups = groupSuggestions;
    console.log(groups);
    const filteredGroups = groups.filter((group) => {
      return group.members.some((member) => member.username === user.username);
    });

    setGroups(filteredGroups);
  }, [groupSuggestions, user.username]);

  return (
    <Container fluid>
      <Row>
        {/* Left Content */}
        <Col md={8}>
          {/* First Component */}
          <div className='content-box'>
            <h2>{user.username}</h2>
            <p>{user.bio}</p>
            <div className='profile-badge-container'>
              <p>emblem</p>
              <p>emblem</p>
              <p>emblem</p>
            </div>
            <Button variant='outline-danger' onClick={onLogout}>
              Logout
            </Button>
          </div>

          {/* Second Component */}
          <div className='content-box'>
            <h2>Component 2</h2>
            <p>My Books</p>
          </div>
        </Col>

        {/* Right Side Panel */}
        <Col md={4} className='side-panel'>
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
        </Col>
      </Row>
    </Container>
  );
};
