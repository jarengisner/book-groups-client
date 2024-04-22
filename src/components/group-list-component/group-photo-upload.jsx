import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';

import './group-photo-upload.css';

export const GroupPhotoUpload = ({
  group,
  imageUploadHandler,
  editPhotoHandler,
}) => {
  const [uploading, setUploading] = useState(false);

  const groupname = group.name;

  const onDrop = async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('photo', file);

    try {
      setUploading(true);
      const response = await fetch(
        `https://groups-api-6de9bfaff2b7.herokuapp.com/groups/${groupname}/picture`,
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
      const newUrl = data.groupImg;
      setUploading(false);
      console.log(newUrl);
      imageUploadHandler(newUrl);
      editPhotoHandler();
    } catch (error) {
      console.error('Error uploading photo:', error);
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <div {...getRootProps()} className='dropZoneG'>
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
