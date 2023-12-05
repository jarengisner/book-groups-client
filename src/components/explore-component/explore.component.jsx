import { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Navigation } from '../navigation/navigation.component';
import '../../index.css';

export const Explore = () => {
  const [suggestions, setSuggested] = useState([]);
  const [groupSuggestions, setGroupSuggestions] = useState([]);

  /*
  Need to complete this page with styling and make sure that proper connections are made when clicking on each individual club
  */

  useEffect(() => {
    fetch('http://localhost:8080/clubs')
      .then((res) => res.json())
      .then((data) => {
        const clubData = data.map((club) => {
          return {
            id: club._id,
            name: club.name,
            description: club.description,
          };
        });

        console.log(clubData);
        setGroupSuggestions(clubData);
      });
  }, []);

  return (
    <Container>
      <Row>
        <Navigation />
      </Row>
      <Row>
        <>
          {suggestions.length > 0 ? (
            suggestions.map((item) => (
              <Col>
                <Card>
                  <h1>{item.name}</h1>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <h1>Empty at the moment</h1>
            </Col>
          )}
        </>
      </Row>
      <Row className='groupSuggestionRow'>
        <>
          {groupSuggestions.length > 0 ? (
            groupSuggestions.map((item) => (
              <Col md={8}>
                <Card className='groupSuggestionCard'>
                  <h1>{item.name}</h1>
                  <h2>{item.description}</h2>
                </Card>
              </Col>
            ))
          ) : (
            <Col>Group suggestions currently empty</Col>
          )}
        </>
      </Row>
    </Container>
  );
};
