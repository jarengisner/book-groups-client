import { useEffect, useState } from 'react';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faImage } from '@fortawesome/free-solid-svg-icons';
//CSS import
import '../../index.css';

import { GroupPhotoUpload } from './group-photo-upload';

export const EditGroups = ({ group, tags, closeHandler }) => {
  const [editedName, setEditedName] = useState(group.name);
  const [editedDescription, setEditedDescription] = useState(group.description);
  const [editedTags, setEditedTags] = useState(group.tags);
  const [showGroupPhotoUpload, setShowGroupPhotoUpload] = useState(false);
  const [groupPhoto, setGroupPhoto] = useState(group.groupImg);

  const nameEditHandler = (e) => {
    setEditedName(e.target.value);
  };

  const descriptionEditHandler = (e) => {
    setEditedDescription(e.target.value);
  };

  const tagEditHandler = () => {};

  const editPhotoHandler = () => {
    if (showGroupPhotoUpload === false) {
      setShowGroupPhotoUpload(true);
    } else {
      setShowGroupPhotoUpload(false);
    }
  };

  const imageUploadHandler = (url) => {
    setGroupPhoto(url);
  };

  const submitChangesHandle = () => {
    fetch(`http://localhost:8080/clubs/${group.name}/details`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        name: editedName,
        description: editedDescription,
        tags: editedTags,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        //This is where we can pass the new updated user back to the user-list so that it renders instantly
        console.log(data);
      });
  };

  return (
    <div className='group-edit-inner-container'>
      {/* <Row>
        <Col md={1}>
          <button className='close-button' onClick={() => closeHandler()}>
            <FontAwesomeIcon icon={faX} className='x-icon' />
          </button>
        </Col>
      </Row> */}
      <Row style={{ marginTop: '2%' }}>
        <div className='standard-row-flex'>
          <Col md={4}>
            <div className='standard-column-flex'>
              <img
                src={groupPhoto}
                alt='group profile'
                className='editGroupPic'
              />
              <button onClick={() => editPhotoHandler()} className='img-button'>
                <FontAwesomeIcon icon={faImage} className='imageIcon' />
              </button>
            </div>
          </Col>
          <Col md={4}>
            <h1>{group.name}</h1>
            <p>{group.description}</p>
          </Col>
          <Col md={4}>
            <div className='close-button-position'>
              <button className='close-button' onClick={() => closeHandler()}>
                <FontAwesomeIcon icon={faX} className='x-icon' />
              </button>
            </div>
          </Col>
        </div>
      </Row>
      <div>
        {showGroupPhotoUpload ? (
          <GroupPhotoUpload
            group={group}
            editPhotoHandler={editPhotoHandler}
            imageUploadHandler={imageUploadHandler}
          />
        ) : (
          <div className='edit-form-div'>
            <Row className='group-edit-input'>
              <h2>Edit Name</h2>
              <input
                type='text'
                placeholder={group.name}
                value={editedName}
                onChange={nameEditHandler}
              ></input>
            </Row>
            <Row className='group-edit-input'>
              <h2>Edit Description</h2>
              <textarea
                placeholder={group.description}
                rows={3}
                style={{ marginBottom: '5%' }}
                value={editedDescription}
                onChange={descriptionEditHandler}
              ></textarea>
            </Row>
            <Row>
              <h1>Need to make tags section here</h1>
            </Row>
            <Row>
              <Button onClick={submitChangesHandle}>Submit Changes</Button>
            </Row>
          </div>
        )}
      </div>
    </div>
  );
};
