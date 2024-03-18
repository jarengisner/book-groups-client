import { useState } from 'react';
import { Card, Col, Container, Form, Row, Button } from 'react-bootstrap';
import '../../index.css';
import { useNavigate } from 'react-router-dom';

export const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  /* Insert code here for handling login once api is ready */
  /*
  Need to just style this correctly so it looks good, and also then make sure that we actually submit our login request when we log into the application
  */

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((info) => {
        console.log('Login response: ' + info);

        if (info.user) {
          localStorage.setItem('user', JSON.stringify(info.user));
          localStorage.setItem('token', info.token);
          console.log('successful login');
          onLogin(info.user, info.token);
          navigate('/');
        } else {
          console.log('username or password is incorrect');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <Row className='justify-content-center'>
        <Col md={3}>
          <Card className='login-card'>
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
                  type='password'
                  value={password}
                  required
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder='Password'
                />
              </Form.Group>
              <Button
                variant='primary'
                type='submit'
                className='mt-3'
                onClick={handleSubmit}
              >
                Log-In
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
