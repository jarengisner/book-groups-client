import { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Navigation } from '../navigation/navigation.component';

export const MemberView = ({ user }) => {
  /*
  Start implementing the same logic here that we used in the club preview for finding
  the club based off of the URL param, and then we can fetch it in exactly the same manner

  Then we need to carve out a good posts section and make sure that we can post things, then move on to likes, etc.
  */
  return (
    <Container>
      <Row>
        <Navigation />
      </Row>
      <Row>
        <Col>
          {/* This is gonna be the club preview, nothing else needs to be added here */}
          {/* <>
            {club ? (
              <ClubPreviewInfo club={club} user={user} />
            ) : (
              <p>Loading....</p>
            )}
          </> */}
          <div>
            {/* the actual posts section will be here, this will be a very in depth area */}
          </div>
        </Col>
        <Col>
          {/* member list here just like in the preview */}
          {/* <>{club ? <MemberList club={club} /> : <p>Loading...</p>}</> */}
        </Col>
      </Row>
    </Container>
  );
};
