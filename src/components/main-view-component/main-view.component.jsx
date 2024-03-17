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
import { Recommendation } from './recommended.component';
import { CreateGroup } from '../create-group/create-group.component';
import { EditGroups } from '../group-list-component/group-editing.component';

import '../../index.css';

export const MainView = () => {
  //State to check user and token for security
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  //initialGroups holds all of the groups fetched from the Db
  const [initialGroups, setInitialGroups] = useState([]);
  //Holds all of our tags for filtering the groups 'genre'
  const [tag, setTag] = useState([]);
  //Holds recommended groups
  const [recommended, setRecommended] = useState([]);
  //Holds current search state
  const [query, setQuery] = useState('All');
  //Holds results filtered by search
  const [filteredResults, setFilteredResults] = useState([]);

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

        setTag(uniqueTags);
        setInitialGroups(clubData);
        setFilteredResults(clubData);
        console.log('main:', clubData);
      });
  }, []);

  //Handles all filter results
  const queryHandler = (arg) => {
    if (arg === 'All') {
      setQuery('All');
      setFilteredResults(initialGroups);
    } else {
      let current = initialGroups.filter((group) => group.tags.includes(arg));
      setFilteredResults(current);
    }
  };

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
                    <Col style={{ marginTop: 80 }}>
                      <div className='left-side-filter'>
                        <button
                          key='allkey'
                          onClick={() => queryHandler('All')}
                          className='filterButton'
                        >
                          All
                        </button>
                        {tag.length > 0 ? (
                          tag.map((t) => (
                            <button
                              key={t}
                              onClick={() => queryHandler(t)}
                              className='filterButton'
                            >
                              {t}
                            </button>
                          ))
                        ) : (
                          <h1>Loading.....</h1>
                        )}
                      </div>
                    </Col>
                    <Col>
                      {filteredResults.map((item) => (
                        <Link
                          to={`/groups/${item.name}`}
                          className='removeDecoration'
                          key={item.name}
                        >
                          <Card
                            style={{ margin: 7 }}
                            className='main-view-card'
                          >
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
                    <Col>
                      <Recommendation groups={initialGroups} />
                    </Col>
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
            path='/creategroup'
            element={<CreateGroup user={user} tags={tag} />}
          />
          <Route
            path='/mygroups'
            element={
              <>
                {user && token ? (
                  <GroupList user={user} groups={initialGroups} tags={tag} />
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
