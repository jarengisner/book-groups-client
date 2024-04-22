import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

import '../profile-component/profile.styles.css';

export const ProfilePhotoUpload = ({ user, handlePhotoRefresh }) => {
  const [uploading, setUploading] = useState(false);

  const username = user.username;

  const onDrop = async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('photo', file);

    try {
      setUploading(true);
      const response = await fetch(
        `http://localhost:8080/users/${username}/picture`,
        {
          method: 'PUT',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Photo uploaded successfully');
      const newUrl = data.profilePic;
      setUploading(false);
      handlePhotoRefresh(newUrl);
    } catch (error) {
      console.error('Error uploading photo:', error);
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div {...getRootProps()} /* style={dropzoneStyles} */ className='dropZoneG'>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the photo here ...</p>
      ) : (
        <p>Drag 'n' drop a photo here, or click to select a photo</p>
      )}
      {uploading && <p>Uploading...</p>}
    </div>
  );
};
