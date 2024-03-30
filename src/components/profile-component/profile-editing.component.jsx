import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faImage, faCheck } from '@fortawesome/free-solid-svg-icons';
import { ProfilePhotoUpload } from './profile-photo-upload';

//styling
import '../profile-component/profile.styles.css';

export const EditProfile = ({
  user,
  refreshUserBioAfterChanges,
  refreshUserPicAfterChanges,
  syncUser,
  showMenu,
}) => {
  const [newBio, setNewBio] = useState('');
  const [newPic, setNewPic] = useState('');

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
        newBio: newBio,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        refreshUserBioAfterChanges(newBio);
        refreshUserPicAfterChanges(newPic);
        syncUser(data);
      });
  };

  //refreshUserAfterChanges(newBio, newPic);

  const handlePhotoRefresh = (picUrl) => {
    console.log(picUrl);
    setNewPic(picUrl);
  };

  return (
    <div>
      <div className='title-bar'>
        <h1 className='edit-title'>Edit profile</h1>
        <button className='edit-close-button' onClick={() => showMenu()}>
          <FontAwesomeIcon icon={faX} />
        </button>
      </div>
      <h2 className='edit-profile-bio-title'>Change profile picture</h2>
      <ProfilePhotoUpload user={user} handlePhotoRefresh={handlePhotoRefresh} />
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
