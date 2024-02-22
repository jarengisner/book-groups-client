import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Dropdown } from 'react-bootstrap';
import { Navigation } from '../navigation/navigation.component';
import '../../index.css';
import { Link } from 'react-router-dom';
import { Suggested } from './suggested-carousel.component';
import { CardDisplay } from './main-card-display.component';
import { ClipLoader } from 'react-spinners';

export const Explore = ({ user, initialRenderedGroups, tags }) => {
  const [loaded, setLoaded] = useState(false);
  const [tag, setTag] = useState([]);
  const [filter, setFilter] = useState('All');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [backupSuggestions, setBackup] = useState([]);

  useEffect(() => {
    if (initialRenderedGroups.length === 0) {
      return;
    }

    setFilteredSuggestions(initialRenderedGroups);
    setBackup(initialRenderedGroups);
    console.log('Explore:', initialRenderedGroups);
  }, [tags, initialRenderedGroups]);

  const filterHandler = (selectedFilter) => {
    setFilter(selectedFilter);

    if (selectedFilter === 'All') {
      setFilteredSuggestions(backupSuggestions);
    } else {
      const filtered = backupSuggestions.filter((group) =>
        group.tags.includes(selectedFilter)
      );
      setFilteredSuggestions([...filtered]);
    }
  };

  return (
    <Container>
      <Row>
        <Navigation />
      </Row>
      <Row>
        <Col>
          <button onClick={() => filterHandler('All')}>All</button>
          {tags ? (
            tags.map((t) => (
              <button onClick={() => filterHandler(t)} key={t}>
                <span>{t}</span>
              </button>
            ))
          ) : (
            <h1>Loading......</h1>
          )}
        </Col>
        <Col sm={6}>
          {!filteredSuggestions.length > 0 ? (
            <div>
              <ClipLoader color='#36D7B7' size={50} />
            </div>
          ) : (
            <CardDisplay groups={filteredSuggestions} filter={filter} />
          )}
        </Col>
        <Col sm={3}>
          {!backupSuggestions.length > 0 ? (
            <div>
              <ClipLoader color='#36D7B7' size={50} />
            </div>
          ) : (
            <Suggested groups={backupSuggestions} />
          )}
        </Col>
      </Row>
    </Container>
  );
};
