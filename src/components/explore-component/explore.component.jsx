import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Dropdown } from 'react-bootstrap';
import { Navigation } from '../navigation/navigation.component';
import '../../index.css';
import { Link } from 'react-router-dom';
import { Suggested } from './suggested-carousel.component';

export const Explore = () => {
  const [groupSuggestions, setGroupSuggestions] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [tag, setTag] = useState([]);
  const [filter, setFilter] = useState('All');

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

        for (let i = 0; i < clubData.length; i++) {
          let current = clubData[i].tags;
          for (let j = 0; j < current.length; j++) {
            tagHolder.push(current[j]);
          }
        }

        setTag(Array.from(new Set(tagHolder)));

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

  const filterHandler = () => {
    //This needs to create a new array of the groupSuggestions that contains the
  };

  return (
    <Container>
      <Row>
        <Navigation />
      </Row>
      <Row>
        <Col sm={3}>
          <div className='tag-parent-div'>
            {tag.map((t) => (
              <h1>{t}</h1>
            ))}
          </div>
        </Col>
        <Col sm={6}>
          <>
            {loaded ? (
              groupSuggestions.map((item) => (
                <Link
                  to={`/groups/${item.name}`}
                  className='removeDecoration'
                  key={item.name}
                >
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
              ))
            ) : (
              <h1>Loading...</h1>
            )}
          </>
        </Col>
        <Col sm={3}>
          <Suggested groups={groupSuggestions} />
        </Col>
      </Row>
    </Container>
  );
};
