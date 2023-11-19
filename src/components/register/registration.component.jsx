import { useState } from 'react';
import { Card, Col, Container, Form, Row, Button } from 'react-bootstrap';

export const Registration = () => {
  const [newUsername, setNewUser] = useState('');
  const [newPassword, setNewPass] = useState('');
  const [email, setEmail] = useState('');

  /* Insert code here for handling signup once api is ready */
  /*
  Styling and make sure that we submit to the api when we submit the form
  */

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <h1>Log In</h1>
            <Form>
              <Form.Group controlId='forUsername'>
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type='text'
                  value={newUsername}
                  required
                  onChange={(e) => {
                    setNewUser(e.target.value);
                  }}
                  placeholder='Username'
                />
              </Form.Group>
              <Form.Group controlId='forPass'>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type='text'
                  value={newPassword}
                  required
                  onChange={(e) => {
                    setNewPass(e.target.value);
                  }}
                  placeholder='Password'
                />
              </Form.Group>
              <Form.Group controlId='forPass'>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type='text'
                  value={email}
                  required
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder='Email'
                />
              </Form.Group>
              <Button variant='primary' type='submit' className='mt-3'>
                Sign-Up
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
