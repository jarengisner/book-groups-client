import { useEffect, useState } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Navigation } from '../navigation/navigation.component';
import '../../index.css';
import { Link } from 'react-router-dom';
import { Suggested } from './suggested-carousel.component';

export const Explore = () => {
  const [groupSuggestions, setGroupSuggestions] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [tag, setTag] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/clubs');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        const tagHolder = [];

        const clubData = data.map((club) => ({
          id: club._id,
          name: club.name,
          description: club.description,
          groupImg: club.groupImg,
          members: club.members,
          tags: club.tags,
        }));

        clubData.forEach((c) => {
          tagHolder.push(c.tags);
        });

        let finalTags = tagHolder.concat();
        setTag(finalTags);

        setGroupSuggestions(clubData);
        setLoaded(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(groupSuggestions);
  }, [groupSuggestions]);

  return (
    <Container>
      <Row>
        <Navigation />
      </Row>
      <Row style={{ border: '1px solid grey' }}>
        <Suggested groups={groupSuggestions} />
      </Row>
      <Row style={{ border: '1px solid grey' }}>
        {tag.map((t) => (
          <h1>{t}</h1>
        ))}
      </Row>
      <Row className='groupSuggestionRow' style={{ marginTop: 20 }}>
        <>
          {loaded ? (
            groupSuggestions.map((item) => (
              <Col md={5} sm={8} lg={5} key={item.name}>
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
