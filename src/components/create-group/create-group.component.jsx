import { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import '../../index.css';

export const CreateGroup = ({ user, tags }) => {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [initialPost, setInitialPost] = useState('');
  const [groupTags, setGroupTags] = useState([]);

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
        {groupTags.length === 0 ? (
          <p>No tags selected so far</p>
        ) : (
          <div>
            {groupTags.map((t) => (
              <Button
                key={t}
                variant='outline-secondary'
                onClick={() => tagsHandler(t)}
                className='selected-tags'
              >
                {t}
              </Button>
            ))}
          </div>
        )}
        {tags.length > 0 ? (
          tags.map((t) => (
            <Button key={t} onClick={() => tagsHandler(t)}>
              {t}
            </Button>
          ))
        ) : (
          <h1>Loading.....</h1>
        )}
      </div>
    </Container>
  );
};
