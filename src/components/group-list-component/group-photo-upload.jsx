import { useState } from 'react';
import { useDropzone } from 'react-dropzone';

import './group-photo-upload.css';

export const GroupPhotoUpload = ({ group }) => {
  const [uploading, setUploading] = useState(false);

  const groupname = group.name;

  const onDrop = async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('photo', file);

    try {
      setUploading(true);
      // Make a POST request to the API endpoint for uploading the photo using fetch
      const response = await fetch(`/groups/${groupname}/picture`, {
        method: 'PUT',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log('Photo uploaded successfully');
      setUploading(false);
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
