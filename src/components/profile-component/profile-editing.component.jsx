import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faImage, faCheck } from '@fortawesome/free-solid-svg-icons';

//styling
import '../profile-component/profile.styles.css';

export const EditProfile = ({ user }) => {
  const [newUsername, setNewUsername] = useState('');
  const [newBio, setNewBio] = useState('');

  const usernameChangeHandle = (e) => {
    setNewUsername(e.target.value);
  };

  const bioChangeHandle = (e) => {
    setNewBio(e.target.value);
  };

  const submitEditHandle = () => {
    fetch(`http://localhost:8080/users/update/${user.username}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: newUsername,
        bio: newBio,
      }),
    });
  };

  return (
    <div>
      <div className='title-bar'>
        <h1 className='edit-title'>Edit profile</h1>
        <button className='edit-close-button'>
          <FontAwesomeIcon icon={faX} />
        </button>
      </div>
      <h2 className='edit-profile-username-title'>Enter new username...</h2>
      <input
        placeholder={user.username}
        className='username-input'
        value={newUsername}
        onChange={usernameChangeHandle}
      ></input>
      <h2 className='edit-profile-bio-title'>Enter a new bio...</h2>
      <textarea
        placeholder={user.bio}
        className='bio-input'
        value={newBio}
        onChange={bioChangeHandle}
      ></textarea>
      <div className='submit-div'>
        <button
          onClick={() => submitEditHandle()}
          className='profile-edit-submit-button'
        >
          Submit
        </button>
      </div>
    </div>
  );
};
