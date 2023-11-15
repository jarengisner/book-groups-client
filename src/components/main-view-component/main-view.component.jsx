import { useState, useEffect } from 'react';
import { Navigation } from '../navigation/navigation.component';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import { Profile } from '../profile-component/profile.component';
import { Explore } from '../explore-component/explore.component';

export const MainView = () => {
  const [user, setUser] = useState(null);
  return (
    <BrowserRouter>
      <Row>
        <Navigation />
      </Row>
      <Row className='justify-content-md-center'>
        <Routes>
          <Route
            path='/'
            element={
              <>
                {/* add login to make sure that we check for a user */}
                <Explore />
              </>
            }
          />
          <Route
            path='/profile'
            element={
              <>
                {/* add logic to check for user here */}
                <Profile />
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};
