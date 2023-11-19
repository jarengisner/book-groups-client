import { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Navigation } from '../navigation/navigation.component';

export const MemberView = ({ club }) => {
  return (
    <Container>
      <Row>
        <Navigation />
      </Row>
    </Container>
  );
};
