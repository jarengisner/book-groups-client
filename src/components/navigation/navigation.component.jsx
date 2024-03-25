import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import '../../index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export const Navigation = () => {
  return (
    <Navbar
      expand='lg'
      className='bg-body-tertiary justify-content-between'
      data-bs-theme='dark'
      style={{ height: 80, margin: 0, padding: 0 }}
      fixed='top'
    >
      <Container fluid>
        <Navbar.Brand as={Link} to='/' style={{ marginLeft: '10px' }}>
          <span className='navbar-title'>groups</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto' style={{ marginLeft: '10px' }}>
            <Nav.Link as={Link} to='/' className='text-standard'>
              Home
            </Nav.Link>
            {/* navigates to home or / */}
            <Nav.Link as={Link} to='/mygroups' className='text-standard'>
              My Groups
            </Nav.Link>
          </Nav>
          <Nav className='justify-content-end'>
            <Nav.Link
              as={Link}
              to='/creategroup'
              className='create-group-button'
            >
              Create Group
            </Nav.Link>
            <Nav.Link
              as={Link}
              to='/profile'
              className='text-standard'
              style={{ marginRight: '20px' }}
            >
              <FontAwesomeIcon icon={faUser} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
