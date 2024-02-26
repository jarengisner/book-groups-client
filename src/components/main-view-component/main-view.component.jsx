import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Card, Col, Row } from 'react-bootstrap';
import { Profile } from '../profile-component/profile.component';

import { Login } from '../login/login.component';
import { Registration } from '../register/registration.component';
import { GroupList } from '../group-list-component/group-list.component';
import { ClubPreview } from '../club-preview-component/club-preview.component';
import { MemberView } from '../club-member-view/club-member-view.component';
import { ClipLoader } from 'react-spinners';
import { Navigation } from '../navigation/navigation.component';

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [initialGroups, setInitialGroups] = useState([]);
  const [tag, setTag] = useState([]);

  const onLogin = (user, token) => {
    setUser(user);
    setToken(token);
  };

  useEffect(() => {
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
            tags: club.tags,
          };
        });

        const uniqueTags = Array.from(
          new Set(clubData.flatMap((group) => group.tags))
        );
        /* console.log(uniqueTags); */
        setTag(uniqueTags);

        setInitialGroups(clubData);
        console.log('main:', clubData);
      });
  }, []);

  return (
    <BrowserRouter>
      <Navigation />
      <Row className='justify-content-md-center'>
        <Routes>
          <Route
            path='/'
            element={
              <>
                {!user || !token ? (
                  <Navigate to='/login' />
                ) : initialGroups.length === 0 ? (
                  <h1>Loading.....</h1>
                ) : (
                  <>
                    <Col>
                      {tag.length > 0 ? (
                        tag.map((t) => <h1 key={t}>{t}</h1>)
                      ) : (
                        <h1>Loading.....</h1>
                      )}
                    </Col>
                    <Col>
                      {initialGroups.map((item) => (
                        <Link
                          to={`/groups/${item.name}`}
                          className='removeDecoration'
                          key={item.name}
                        >
                          <Card style={{ margin: 7 }}>
                            <div className='suggestionsWithImg'>
                              <img
                                src={item.groupImg}
                                alt='group logo'
                                className='profilePic'
                              ></img>
                              <div style={{ width: '60%' }}>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Subtitle>
                                  {item.description}
                                </Card.Subtitle>
                              </div>
                            </div>
                          </Card>
                        </Link>
                      ))}
                    </Col>
                    <Col>{/* right column */}</Col>
                  </>
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
                    groupSuggestions={initialGroups}
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
