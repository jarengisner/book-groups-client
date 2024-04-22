import { Navigation } from '../navigation/navigation.component';
import { Container, Row, Col } from 'react-bootstrap';
import { ClubPreviewInfo } from './club-info';
import { MemberList } from './member-list';
import { Navigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import '../../index.css';

export const ClubPreview = ({ user }) => {
  const [club, setClub] = useState(null);
  const userId = user.username;

  const { groupname } = useParams();

  console.log(groupname);

  //Loads all other data from the group's name
  useEffect(() => {
    fetch(`http://localhost:8080/clubs/${groupname}`)
      .then((res) => res.json())
      .then((data) => {
        setClub(data);
        console.log('Success');
      })
      .catch((err) => {
        console.log(err);
        console.log(
          'There was an error when loading a specific club to the preview page'
        );
      });
  }, []);

  return (
    <>
      {club ? (
        club.members.some((member) => member.username === userId) ? (
          <Navigate to={`/groups/${groupname}/member`} />
        ) : (
          <Container>
            <Row>
              <Navigation />
            </Row>
            <Row>
              <Col sm={12} md={9}>
                <ClubPreviewInfo club={club} user={user} />
              </Col>
              <Col sm={12} md={3}>
                <MemberList club={club} />
              </Col>
            </Row>
          </Container>
        )
      ) : (
        <Container>
          <Row>
            <Navigation />
          </Row>
          <Row>
            <Col>
              <p>Loading....</p>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};
