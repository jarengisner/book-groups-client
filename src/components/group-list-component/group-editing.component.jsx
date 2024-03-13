import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

//CSS import
import '../../index.css';

export const EditGroups = ({ group, tags }) => {
  const [editedName, setEditedName] = useState(group.name);
  const [editedDescription, setEditedDescription] = useState(group.description);
  const [editedTags, setEditedTags] = useState(group.tags);

  const nameEditHandler = () => {};

  const descriptionEditHandler = () => {};

  const tagEditHandler = () => {};

  return (
    <div className='group-edit-inner-container'>
      <Row>
        <Col md={4}>
          <img src={group.groupImg} alt='group profile' />
        </Col>
        <Col md={7}>
          <h1>{group.name}</h1>
          <p>{group.description}</p>
        </Col>
        <Col md={1}>
          <p>X button needed</p>
        </Col>
      </Row>
      <Row>
        <h2>Form placeholder</h2>
      </Row>
      <Row>
        <h2>Form placeholder</h2>
      </Row>
      <Row>
        <h2>Form placeholder</h2>
      </Row>
      <Row>
        <h2>Form placeholder</h2>
      </Row>
      <Row>
        <h2>Form placeholder</h2>
      </Row>
      <Row>
        <h2>Form placeholder</h2>
      </Row>
    </div>
  );
};
