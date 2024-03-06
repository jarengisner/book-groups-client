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
  const createHandler = () => {};

  return (
    <Container>
      <div>upload profile pic eventually</div>
      <div>
        <h1>Group Name</h1>
        <input
          type='text'
          value={name}
          onChange={nameChangeHandle}
          placeholder='Enter the name of your new group...'
        ></input>
      </div>
      <div>
        <h1>Group Bio</h1>
        <input
          type='text'
          value={bio}
          onChange={bioChangeHandler}
          placeholder='Enter a bio for your group...'
        />
      </div>
      <div>Write an initial post</div>
      {/* look for details about what exactly we added in the post creation */}
      <div>
        <h1>Select tags for your group</h1>
        <input
          type='text'
          value={query}
          onChange={querySearchHandle}
          placeholder='Search or create tag...'
        />
        {groupTags.length === 0 ? (
          <p>No tags selected so far</p>
        ) : (
          <div>
            {groupTags.map((t) => (
              <Button
                variant='outline-secondary'
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
            {/* <Row>
              {tags.length > 0 ? (
                query ? (
                  tags
                    .filter((tag) => tag.includes(query.toLowerCase()))
                    .map((t) => (
                      <Col md={3} style={{ marginTop: 8 }}>
                        <Button key={t} onClick={() => tagsHandler(t)}>
                          {t}
                        </Button>
                      </Col>
                    ))
                ) : (
                  tags.map((t) => (
                    <Col md={3} style={{ marginTop: 8 }}>
                      <Button key={t} onClick={() => tagsHandler(t)}>
                        {t}
                      </Button>
                    </Col>
                  ))
                )
              ) : (
                <h1>Loading.....</h1>
              )}
            </Row> */}

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
    </Container>
  );
};

/* {tags.length > 0 ? (
    tags.map((t) => (
      <Col md={3} style={{ marginTop: 8 }}>
        <Button key={t} onClick={() => tagsHandler(t)}>
          {t}
        </Button>
      </Col>
    ))
  ) : (
    <h1>Loading.....</h1>
  )} */
