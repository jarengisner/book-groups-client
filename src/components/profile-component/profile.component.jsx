import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import '../profile-component/profile.styles.css';
import { useState } from 'react';
import { useEffect } from 'react';
import { Navigation } from '../navigation/navigation.component';

export const Profile = ({ user, onLogout }) => {
  //make algorithm to sort out groups that the user is involved in
  const fakeData = [
    {
      name: 'Horror Book Lovers',
      desc: 'A collection of people who love horror books',
    },
    {
      name: 'Thursday Reading Club',
      desc: 'Every thursday meeting about a book',
    },
    {
      name: 'Alien Lore Club',
      desc: 'Discovering the truth',
    },
  ];

  const [groups, setGroups] = useState(fakeData);

  return (
    <Container fluid>
      <Row>
        <Navigation />
      </Row>
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
                <Card>
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
