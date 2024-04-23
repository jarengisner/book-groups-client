import { useState } from 'react';
import { Col, Row, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX, faImage, faCheck } from '@fortawesome/free-solid-svg-icons';
//CSS import
import '../../index.css';

import { GroupPhotoUpload } from './group-photo-upload';

export const EditGroups = ({ group, tags, closeHandler }) => {
  const [editedName, setEditedName] = useState(group.name);
  const [editedDescription, setEditedDescription] = useState(group.description);
  const [showGroupPhotoUpload, setShowGroupPhotoUpload] = useState(false);
  const [groupPhoto, setGroupPhoto] = useState(group.groupImg);

  const [success, setSuccess] = useState(null);

  const [editedTags, setEditedTags] = useState(group.tags);
  const [query, setQuery] = useState('');

  //handles name change of the group
  const nameEditHandler = (e) => {
    setEditedName(e.target.value);
  };

  //handles description change
  const descriptionEditHandler = (e) => {
    setEditedDescription(e.target.value);
  };

  //handles showing the group photo upload component, or keeping the editing form
  const editPhotoHandler = () => {
    if (showGroupPhotoUpload === false) {
      setShowGroupPhotoUpload(true);
    } else {
      setShowGroupPhotoUpload(false);
    }
  };

  //sets the groupPhoto, to force re-render upon upload from photo component
  const imageUploadHandler = (url) => {
    setGroupPhoto(url);
  };

  //takes in a tag, and simply determines if the tag had been selected, if so remove, if not keep
  const tagsHandler = (tag) => {
    if (editedTags.includes(tag)) {
      setEditedTags((prevTags) => prevTags.filter((t) => t !== tag));
    } else {
      setEditedTags((prevTags) => [...prevTags, tag]);
    }
  };

  //simple search function
  const querySearchHandle = (e) => {
    setQuery(e.target.value);
  };

  //creates tag from user that is not yet in db
  const queryCreateHandle = (tag) => {
    setEditedTags((prevTags) => [...prevTags, tag]);
  };

  //submits all changes made within the form, except for the group photo
  //Also handles re-routing after completing the changes, to show user direct results.
  const submitChangesHandle = () => {
    //marks the start of the loading icon
    //setCurrentlySending(true);
    fetch(
      `https://groups-api-6de9bfaff2b7.herokuapp.com/clubs/${group.name}/details`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: editedName,
          description: editedDescription,
          tags: editedTags,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log('Success');
        //turns off loading screen
        setSuccess(true);
      })
      .catch((err) => {
        console.log('error in updating the users group' + err);
        //setCurrentlySending(false);
        setSuccess(false);
      });
  };

  return (
    <div className='group-edit-inner-container'>
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
      {success === null ? (
        <>
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
                  className='name-input-changer'
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
                  className='description-input-changer'
                ></textarea>
              </Row>
              <Row>
                <div className='create-group-div'>
                  <h2 className='create-group-div'>
                    Select tags for your group
                  </h2>
                  <input
                    type='text'
                    value={query}
                    onChange={querySearchHandle}
                    placeholder='Search or create tag...'
                    className='create-group-input'
                  />
                  {editedTags.length === 0 ? (
                    <p className='create-group-div'>No tags selected so far</p>
                  ) : (
                    <div className='create-group-div'>
                      {editedTags.map((t) => (
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
                                .filter((tag) =>
                                  tag.includes(query.toLowerCase())
                                )
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
              </Row>
              <Row>
                <button
                  onClick={submitChangesHandle}
                  className='group-edit-submit-button'
                >
                  Submit Changes
                </button>
              </Row>
            </div>
          )}
        </>
      ) : success === true ? (
        // Success message and navigation
        <>
          <h3 style={{ marginTop: '5%' }}>Success</h3>
          <div className='d-flex justify-content-center'>
            <div className='success-div'>
              <FontAwesomeIcon icon={faCheck} className='success-check' />
            </div>
          </div>
        </>
      ) : (
        // Failure message
        <>
          <h3 style={{ marginTop: '5%' }}>Failed, try again later...</h3>
          <div className='d-flex justify-content-center'>
            <div className='fail-div'>
              <FontAwesomeIcon icon={faX} className='fail-x' />
            </div>
          </div>
          {setTimeout(() => setSuccess(null), 1000)}{' '}
        </>
      )}
    </div>
  );
};
