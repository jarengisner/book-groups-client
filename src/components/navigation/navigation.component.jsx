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
    >
      <Container fluid>
        <Navbar.Brand as={Link} to='/'>
          <span className='navbar-title'>BookShelf</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='me-auto'>
            <Nav.Link as={Link} to='/' className='text-standard'>
              Home
            </Nav.Link>
            {/* navigates to home or / */}
            <Nav.Link as={Link} to='/mygroups' className='text-standard'>
              My Groups
            </Nav.Link>
          </Nav>
          <Nav className='justify-content-end'>
            <Nav.Link as={Link} to='/profile' className='text-standard'>
              <FontAwesomeIcon icon={faUser} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
