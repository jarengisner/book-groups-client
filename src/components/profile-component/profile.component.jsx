import { Card, Col, Container, Row } from 'react-bootstrap';
import '../profile-component/profile.styles.css';
import { useState } from 'react';
import { useEffect } from 'react';

export const Profile = () => {
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
        {/* Left Content */}
        <Col md={8}>
          {/* First Component */}
          <div className='content-box'>
            <h2>Profile Name</h2>
            <p>This is the first component.</p>
            <div className='profile-badge-container'>
              <p>emblem</p>
              <p>emblem</p>
              <p>emblem</p>
            </div>
          </div>

          {/* Second Component */}
          <div className='content-box'>
            <h2>Component 2</h2>
            <p>This is the second component.</p>
          </div>
        </Col>

        {/* Right Side Panel */}
        <Col md={4} className='side-panel'>
          <div className='content-box'>
            <h2>My groups</h2>
            <p>This is the side panel content.</p>
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
