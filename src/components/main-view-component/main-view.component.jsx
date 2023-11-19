import { useState, useEffect } from 'react';
import { Navigation } from '../navigation/navigation.component';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import { Profile } from '../profile-component/profile.component';
import { Explore } from '../explore-component/explore.component';
import { Login } from '../login/login.component';
import { Registration } from '../register/registration.component';

export const MainView = () => {
  const [user, setUser] = useState(null);

  /*
  Resume by checking and making sure that the routes are correct and that we have all the routes we need
  */
  return (
    <BrowserRouter>
      <Row className='justify-content-md-center'>
        <Routes>
          <Route
            path='/'
            element={
              <>{user ? <Explore user={user} /> : <Navigate to='/login' />}</>
            }
          />
          <Route
            path='/profile'
            element={
              <>{user ? <Profile user={user} /> : <Navigate to='/login' />}</>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Registration />} />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
