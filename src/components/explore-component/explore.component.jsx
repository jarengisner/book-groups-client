import { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Navigation } from '../navigation/navigation.component';

export const Explore = () => {
  const [suggestions, setSuggested] = useState([]);

  /*
  Need to complete this page with styling and make sure that proper connections are made when clicking on each individual club
  */
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
    </Container>
  );
};
