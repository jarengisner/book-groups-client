import { useState } from 'react';
import { Col, Container } from 'react-bootstrap';

export const EditGroups = ({ group }) => {
  return (
    <Container>
      <div style={{ backgroundColor: 'tan' }}>
        <Col md={4}>{group.name}</Col>
        <Col md={8}>test</Col>
      </div>
    </Container>
  );
};
