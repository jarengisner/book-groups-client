import { useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Navigation } from '../navigation/navigation.component';
import { ClubPreviewInfo } from '../club-preview-component/club-info';
import { MemberList } from '../club-preview-component/member-list';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Posts } from './post-section.component';

export const MemberView = ({ user }) => {
  /*
  Start implementing the same logic here that we used in the club preview for finding
  the club based off of the URL param, and then we can fetch it in exactly the same manner

  Then we need to carve out a good posts section and make sure that we can post things, then move on to likes, etc.
  */
  const [posts, setPosts] = useState([]);
  const [club, setClub] = useState(null);

  const { groupname } = useParams();

  useEffect(() => {
    fetch(`http://localhost:8080/clubs/${groupname}`)
      .then((res) => res.json())
      .then((data) => {
        setClub(data);
        setPosts(data.posts);
        /* console.log(data);
        console.log(data.posts); */
      })
      .catch((err) => {
        console.log(err);
        console.log('There was an error loading posts/assigning club');
      });
  }, [posts, groupname]);

  return (
    <Container>
      <Row>
        <Navigation />
      </Row>
      <Row>
        <Col>
          {/* This is gonna be the club preview, nothing else needs to be added here */}
          <>
            {club ? (
              <ClubPreviewInfo club={club} user={user} />
            ) : (
              <p>Loading....</p>
            )}
          </>
          <div>
            {/* the actual posts section will be here, this will be a very in depth area */}
            <Posts user={user} posts={posts} groupname={groupname} />
          </div>
        </Col>
        <Col>
          {/* member list here just like in the preview */}
          <>{club ? <MemberList club={club} /> : <p>Loading...</p>}</>
        </Col>
      </Row>
    </Container>
  );
};
