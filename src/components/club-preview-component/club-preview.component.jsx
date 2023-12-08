import { Navigation } from '../navigation/navigation.component';
import { Container, Row, Col } from 'react-bootstrap';
import { ClubPreviewInfo } from './club-info';
import { MemberList } from './member-list';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import '../../index.css';

export const ClubPreview = ({ clubs }) => {
  const { groupname } = useParams();
  const club = clubs.find((c) => c.name === groupname);
  console.log(clubs);
  console.log(groupname);
  console.log(club);
  return (
    <Container>
      <Row>
        <Navigation />
      </Row>
      <Row>
        <Col>
          <ClubPreviewInfo club={club} />
          <div>
            <h1>Join Club to gain access to clubs posts</h1>
          </div>
        </Col>
        <Col>
          <MemberList club={club} />
        </Col>
      </Row>
    </Container>
  );
};
