import { Navigation } from '../navigation/navigation.component';
import { Container, Row, Col } from 'react-bootstrap';
import { ClubPreviewInfo } from './club-info';
import { MemberList } from './member-list';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../../index.css';

export const ClubPreview = ({ user }) => {
  /* const club = clubs.find((c) => c.name === groupname);

  console.log(clubs);
  console.log(groupname);
  console.log(club);
  console.log(user); */

  const [club, setClub] = useState(null);

  const { groupname } = useParams();

  console.log(groupname);

  useEffect(() => {
    fetch(`http://localhost:8080/clubs/${groupname}`)
      .then((res) => res.json())
      .then((data) => {
        setClub(data);
        console.log(data);
      })
      .catch((err) => {
        console.log(err);
        console.log(
          'There was an error when loading a specific club to the preview page'
        );
      });
  }, []);

  useEffect(() => {
    console.log(club);
  }, [club]);

  return (
    <Container>
      <Row>
        <Navigation />
      </Row>
      <Row>
        <Col>
          <>
            {club ? (
              <ClubPreviewInfo club={club} user={user} />
            ) : (
              <p>Loading....</p>
            )}
          </>
          <div>
            <h1>Join Club to gain access to clubs posts</h1>
          </div>
        </Col>
        <Col>
          <>{club ? <MemberList club={club} /> : <p>Loading...</p>}</>
        </Col>
      </Row>
    </Container>
  );
};
