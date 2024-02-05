import { Carousel, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import '../../index.css';

export const Suggested = ({ groups }) => {
  const newFiltered = groups
    .sort((a, b) => b.members.length - a.members.length)
    .splice(0, 5);

  console.log('new', newFiltered);

  return (
    <>
      {!newFiltered.length > 0 ? (
        <div>
          <ClipLoader color='#36D7B7' size={50} />
        </div>
      ) : (
        <Carousel>
          {newFiltered.map((item) => (
            <Carousel.Item key={item.id}>
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
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  );
};
