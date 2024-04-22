import { useState } from 'react';
import { Card, Col, Container, Form, Row, Button } from 'react-bootstrap';
import '../../index.css';
import { Link, useNavigate } from 'react-router-dom';

export const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    fetch('https://groups-api-6de9bfaff2b7.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((info) => {
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
            <Link to='/register'>
              <p className='register-link'>New? Register here</p>
            </Link>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};
