import { useState, useEffect } from 'react';
import { Navigation } from '../navigation/navigation.component';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import { Profile } from '../profile-component/profile.component';
import { Explore } from '../explore-component/explore.component';
import { Login } from '../login/login.component';
import { Registration } from '../register/registration.component';
import { GroupList } from '../group-list-component/group-list.component';
import Col from 'react-bootstrap';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const onLogin = (user, token) => {
    setUser(user);
    setToken(token);
  };

  return (
    <BrowserRouter>
      <Row className='justify-content-md-center'>
        <Routes>
          <Route
            path='/'
            element={
              <>
                {user && token ? (
                  <Explore user={user} />
                ) : (
                  <Navigate to='/login' />
                )}
              </>
            }
          />
          <Route
            path='/profile'
            element={
              <>
                {user && token ? (
                  <Profile user={user} />
                ) : (
                  <Navigate to='/login' />
                )}
              </>
            }
          />
          <Route path='/login' element={<Login onLogin={onLogin} />} />
          <Route path='/register' element={<Registration />} />
          <Route
            path='/mygroups'
            element={
              <>
                {user && token ? (
                  <GroupList user={user} />
                ) : (
                  <Navigate to='/login' />
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
