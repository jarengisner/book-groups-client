import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Row } from 'react-bootstrap';
import { Profile } from '../profile-component/profile.component';
import { Explore } from '../explore-component/explore.component';
import { Login } from '../login/login.component';
import { Registration } from '../register/registration.component';
import { GroupList } from '../group-list-component/group-list.component';
import { ClubPreview } from '../club-preview-component/club-preview.component';
import { MemberView } from '../club-member-view/club-member-view.component';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  //groups and books to be passed to the explore component
  const [groupSuggestions, setGroupSuggestions] = useState([]);
  //books
  /* const [suggestions, setSuggested] = useState([]); */

  const onLogin = (user, token) => {
    setUser(user);
    setToken(token);
  };

  /* useEffect(() => {
    fetch('http://localhost:8080/clubs')
      .then((res) => res.json())
      .then((data) => {
        const clubData = data.map((club) => {
          return {
            id: club._id,
            name: club.name,
            description: club.description,
            groupImg: club.groupImg,
            members: club.members,
          };
        });

        console.log(clubData);
        setGroupSuggestions(clubData);
      });
  }, []);
 */
  return (
    <BrowserRouter>
      <Row className='justify-content-md-center'>
        <Routes>
          <Route
            path='/'
            element={
              <>
                {user && token ? (
                  <Explore user={user} groupSuggestions={groupSuggestions} />
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
                  <Profile
                    user={user}
                    onLogout={() => {
                      setUser(null);
                      setToken(null);
                      localStorage.clear();
                    }}
                    groupSuggestions={groupSuggestions}
                  />
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
          <Route
            path='/groups/:groupname'
            element={
              <>
                {user && token ? (
                  <ClubPreview user={user} />
                ) : (
                  <Navigate to='/login' />
                )}
              </>
            }
          />
          <Route
            path='/groups/:groupname/member'
            element={
              <>
                {user && token ? (
                  <MemberView user={user} />
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
