import { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

export const Explore = () => {
  const [suggestions, setSuggested] = useState([]);
  return (
    <Container>
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
