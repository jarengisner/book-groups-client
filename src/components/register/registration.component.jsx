import { useState } from 'react';
import { Card, Col, Container, Form, Row, Button } from 'react-bootstrap';
import '../../index.css';
import { Link } from 'react-router-dom';

export const Registration = (onLogin) => {
  const [newUsername, setNewUser] = useState('');
  const [newPassword, setNewPass] = useState('');
  const [newBio, setNewBio] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    const newUserData = {
      username: newUsername,
      password: newPassword,
      bio: newBio,
    };

    fetch('http://localhost:8080/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUserData),
    })
      .then((res) => {
        res.json();
      })
      .then((data) => {
        console.log(data);
        window.location.reload();
      });
  };

  return (
    <Container>
      <Row className='justify-content-center'>
        <Col md={3}>
          <Card className='login-card'>
            <h1>Register</h1>
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
                  type='password'
                  value={newPassword}
                  required
                  onChange={(e) => {
                    setNewPass(e.target.value);
                  }}
                  placeholder='Password'
                />
              </Form.Group>
              <Form.Group controlId='forBio'>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                  as='textarea'
                  value={newBio}
                  required
                  onChange={(e) => {
                    setNewBio(e.target.value);
                  }}
                  placeholder='Enter Bio'
                />
              </Form.Group>
              <Link to='/login'>
                <Button
                  variant='primary'
                  type='submit'
                  className='mt-3'
                  onClick={handleSubmit}
                >
                  Log-In
                </Button>
              </Link>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
