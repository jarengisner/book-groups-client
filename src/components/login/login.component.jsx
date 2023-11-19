import { useState } from 'react';
import { Card, Col, Container, Form, Row, Button } from 'react-bootstrap';
import '../../index.css';

export const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  /* Insert code here for handling login once api is ready */
  /*
  Need to just style this correctly so it looks good, and also then make sure that we actually submit our login request when we log into the application
  */

  return (
    <Container>
      <Row className='justify-content-center'>
        <h1>BookWorm</h1>
        <Col md={3}>
          <Card>
            <h1>Log In</h1>
            <Form>
              <Form.Group controlId='forUsername'>
                <Form.Label>Username:</Form.Label>
                <Form.Control
                  type='text'
                  value={username}
                  required
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  placeholder='Username'
                />
              </Form.Group>
              <Form.Group controlId='forPass'>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  type='text'
                  value={password}
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder='Password'
                />
              </Form.Group>
              <Button variant='primary' type='submit' className='mt-3'>
                Log-In
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
