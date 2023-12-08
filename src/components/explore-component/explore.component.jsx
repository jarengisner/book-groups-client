import { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Navigation } from '../navigation/navigation.component';
import '../../index.css';
import { Link } from 'react-router-dom';

export const Explore = ({ groupSuggestions }) => {
  /* const [suggestions, setSuggested] = useState([]);
  const [groupSuggestions, setGroupSuggestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8080/clubs')
      .then((res) => res.json())
      .then((data) => {
        const clubData = data.map((club) => {
          return {
            id: club._id,
            name: club.name,
            description: club.description,
            groupImg: club.groupImg,
          };
        });

        console.log(clubData);
        setGroupSuggestions(clubData);
      });
  }, []); */
  const suggestions = [];

  return (
    <Container>
      <Row>
        <Navigation />
      </Row>
      <Row style={{ border: '1px solid grey' }}>
        <>
          {suggestions.length > 0 ? (
            suggestions.map((item) => (
              <Col>
                <Card>
                  <h1>{item.name}</h1>
                </Card>
              </Col>
            ))
          ) : (
            <Col>
              <h1>Empty at the moment</h1>
            </Col>
          )}
        </>
      </Row>
      <Row className='groupSuggestionRow' style={{ marginTop: 20 }}>
        <>
          {groupSuggestions.length > 0 ? (
            groupSuggestions.map((item) => (
              <Col md={5} sm={8} lg={5}>
                <Link to={`/groups/${item.name}`} className='removeDecoration'>
                  <Card style={{ margin: 7 }}>
                    <div className='suggestionsWithImg'>
                      <img
                        src={item.groupImg}
                        alt='group logo'
                        className='profilePic'
                      ></img>
                      <div style={{ width: '60%' }}>
                        <Card.Title>{item.name}</Card.Title>
                        <Card.Subtitle>{item.description}</Card.Subtitle>
                      </div>
                    </div>
                  </Card>
                </Link>
              </Col>
            ))
          ) : (
            <Col>Loading...</Col>
          )}
        </>
      </Row>
    </Container>
  );
};
