import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Card, Col, Row, Dropdown } from 'react-bootstrap';
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

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

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
  //controls a like to refresh page instantly upon liking
  const [currentLikes, setCurrentLikes] = useState([]);

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
            posts: club.posts,
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

  const syncUser = (user) => {
    setUser(user);
    localStorage.setItem('user', JSON.stringify(user));
  };

  const likeHandler = (id, groupname, postIndex, postId) => {
    const likeData = {
      userId: id,
      groupname: groupname,
      postIndex: postIndex,
    };

    setCurrentLikes((previousLikes) => [...previousLikes, postId]);

    fetch('http://localhost:8080/posts/like', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(likeData),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));

    console.log('currentLikes ' + currentLikes);
  };

  const unlikeHandler = (id, groupname, postIndex) => {
    //Need to make a handler that will handle un-liking the post
    let filteredLikes = currentLikes.filter((i) => i !== id);
    setCurrentLikes(filteredLikes);
  };

  const refreshGroupsAfterDelete = (name) => {
    let newGroups = initialGroups.filter((group) => group.name !== name);
    setInitialGroups(newGroups);
  };

  return (
    <BrowserRouter>
      <Navigation />
      <Row className='justify-content-md-center' style={{ marginTop: '5%' }}>
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
                    <Col style={{ marginTop: 80 }} className='hide-left-side'>
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
                    <Col className='centerpiece-component'>
                      <div className='dropdown-menu-mobile'>
                        <Dropdown>
                          <Dropdown.Toggle variant='light' id='dropdown-basic'>
                            Filter
                          </Dropdown.Toggle>

                          <Dropdown.Menu>
                            {tag.length > 0 ? (
                              tag.map((t) => (
                                <Dropdown.Item
                                  key={t}
                                  onClick={() => queryHandler(t)}
                                >
                                  {t}
                                </Dropdown.Item>
                              ))
                            ) : (
                              <h1>Loading.....</h1>
                            )}
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <div className='scroll-div'>
                        <h1 className='white-text-header'>Explore</h1>
                        <p className='white-text'>
                          See groups, and a preview of what they're talking
                          about
                        </p>
                        {filteredResults.map((item) => (
                          <div>
                            <Link
                              to={`/groups/${item.name}`}
                              className='removeDecoration'
                              key={item.name}
                            >
                              <Card
                                style={{
                                  marginTop: 7,
                                  borderBottomLeftRadius: 0,
                                  borderBottomRightRadius: 0,
                                  zIndex: 2,
                                }}
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
                            <div className='preview-post'>
                              {item.posts.length > 0 ? (
                                <>
                                  <p className='example-post-author'>
                                    {item.posts[0].postUser}
                                  </p>
                                  <p className='example-post-date'>
                                    {JSON.parse(item.posts[0].date)}
                                  </p>
                                  <p className='example-post'>
                                    {item.posts[0].postBody}
                                  </p>
                                  <div>
                                    {item.posts[0].likedBy.includes(
                                      user.username
                                    ) ||
                                    currentLikes.includes(item.posts[0].id) ? (
                                      <button className='like-button'>
                                        <FontAwesomeIcon
                                          icon={faHeart}
                                          className='heart-button like-button-already-liked'
                                          onClick={() =>
                                            unlikeHandler(
                                              user.username,
                                              item.name,
                                              0,
                                              item.posts[0].id
                                            )
                                          }
                                        />
                                      </button>
                                    ) : (
                                      <button className='like-button'>
                                        <FontAwesomeIcon
                                          icon={faHeart}
                                          className='heart-button'
                                          onClick={() =>
                                            likeHandler(
                                              user.username,
                                              item.name,
                                              0,
                                              item.posts[0].id
                                            )
                                          }
                                        />
                                      </button>
                                    )}
                                    {item.posts[0].likes ? (
                                      <p>{item.posts[0].likes}</p>
                                    ) : null}
                                  </div>
                                </>
                              ) : (
                                <p>No posts to preview</p>
                              )}
                            </div>
                            {/* link was here */}
                          </div>
                        ))}
                      </div>
                    </Col>
                    <Col className='recommended-right-side'>
                      <h1 className='white-text-header'>Recommended Groups</h1>
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
                    syncUser={syncUser}
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
                  <GroupList
                    user={user}
                    groups={initialGroups}
                    tags={tag}
                    refreshGroupsAfterDelete={refreshGroupsAfterDelete}
                  />
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
