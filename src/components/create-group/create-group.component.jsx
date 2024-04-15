import { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import { Row, Col } from 'react-bootstrap';

import '../../index.css';

export const CreateGroup = ({ user, tags }) => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [initialPost, setInitialPost] = useState('');
  const [groupTags, setGroupTags] = useState([]);
  const [query, setQuery] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  //sets state for each property of a group
  const nameChangeHandle = (event) => {
    setName(event.target.value);
  };
  const bioChangeHandler = (event) => {
    setBio(event.target.value);
  };
  const postChangeHadler = (event) => {
    setInitialPost(event.target.value);
  };

  const tagsHandler = (tag) => {
    if (groupTags.includes(tag)) {
      setGroupTags((prevTags) => prevTags.filter((t) => t !== tag));
    } else {
      setGroupTags((prevTags) => [...prevTags, tag]);
    }
  };

  const querySearchHandle = (e) => {
    setQuery(e.target.value);
  };

  const queryCreateHandle = (tag) => {
    setGroupTags((prevTags) => [...prevTags, tag]);
  };

  //handles creation of group fetch requests
  const submitHandle = (name, bio, groupTags, user) => {
    const userData = {
      username: user.username,
      bio: user.bio,
    };

    fetch('http://localhost:8080/clubs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
        description: bio,
        groupCreator: userData,
        tags: groupTags,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data) setMessage('Successfully created group');
        setSuccess(true);
      })
      .catch((err) => {
        console.error(err);
        setMessage('Failed to create group');
      });
  };

  const submitTest = (name, bio, groupTags, user) => {
    console.log(name, bio, groupTags, user);
  };

  return (
    <Container className='create-group-container-layer'>
      <div className='create-group-outer'>
        <div className='create-group-div'>
          Tell us all about your group, all details can be changed later on.
        </div>
        <div className='create-group-div'>
          <h2>Group Name</h2>
          <input
            type='text'
            value={name}
            onChange={nameChangeHandle}
            placeholder='Enter the name of your new group...'
            className='create-group-input'
          ></input>
        </div>
        <div className='create-group-div'>
          <h2>Group Bio</h2>
          <input
            type='text'
            value={bio}
            onChange={bioChangeHandler}
            placeholder='Enter a bio for your group...'
            className='create-group-input'
          />
        </div>
        <div className='create-group-div'>
          <h2 className='create-group-div'>Select tags for your group</h2>
          <input
            type='text'
            value={query}
            onChange={querySearchHandle}
            placeholder='Search or create tag...'
            className='create-group-input'
          />
          {groupTags.length === 0 ? (
            <p className='create-group-div'>No tags selected so far</p>
          ) : (
            <div className='create-group-div'>
              {groupTags.map((t) => (
                <Button
                  variant='outline-dark'
                  onClick={() => tagsHandler(t)}
                  className='selected-tags'
                >
                  {t}
                </Button>
              ))}
            </div>
          )}
          <div className='choices-container'>
            {query && !tags.includes(query.toLowerCase()) && (
              <Row>
                <Button
                  onClick={() => queryCreateHandle(query)}
                  style={{ marginBottom: '20px', width: '300px' }}
                >
                  Create {query}
                </Button>
              </Row>
            )}
            <div>
              {tags.length > 0 ? (
                <div>
                  {query ? (
                    <Row>
                      {tags
                        .filter((tag) => tag.includes(query.toLowerCase()))
                        .map((t) => (
                          <Col key={t} style={{ marginBottom: 8 }}>
                            <Button
                              onClick={() => tagsHandler(t)}
                              style={{ width: '125px' }}
                            >
                              {t}
                            </Button>
                          </Col>
                        ))}
                    </Row>
                  ) : (
                    <Row>
                      {tags.map((t) => (
                        <Col key={t} md={3} style={{ marginBottom: 8 }}>
                          <Button
                            onClick={() => tagsHandler(t)}
                            style={{ width: '125px' }}
                          >
                            {t}
                          </Button>
                        </Col>
                      ))}
                    </Row>
                  )}
                </div>
              ) : (
                <h1>Loading.....</h1>
              )}
            </div>
          </div>
        </div>
        <div className='create-group-div'>
          {/* when the my groups page is built, this will also relocate to that page, passing user */}
          <Button
            className='create-group-submit-button'
            variant='success'
            onClick={() => submitHandle(name, bio, groupTags, user)}
          >
            Create Group
          </Button>
          {success ? (
            <p className='success-message'>Group successfully created</p>
          ) : null}
        </div>
      </div>
    </Container>
  );
};
