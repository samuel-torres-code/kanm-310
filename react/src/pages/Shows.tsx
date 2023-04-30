import { Button, Image, Row, Col } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { ShowData } from './types.js';
import { days } from './types.js';

function Shows() {
  const { id } = useParams<{id: string}>();

  const [showData, setShowData] = useState<ShowData>({
    show_name: 'Show Name',
    show_desc: 'Description',
    show_pic: 'https://i.pinimg.com/originals/4d/f2/d6/4df2d6fb62cc3948933eb6609d1c6ce8.jpg',
    start_time: '12:00:00',
    end_time: '13:00:00',
    day_of_week: 0,
  });

  
  useEffect(() => {
    // Make a GET request to the PHP backend function
    fetch(`http://localhost/kanm-310/react/php/getShows.php?function=getShowData&id=${id}`)
    .then(response => response.json())
    .then(data => setShowData(data));

}, []);
  const convertTimeText = (text: String) => {
    let hour = parseInt(text.slice(10).split(":")[0]);
    let meridiem = (hour >= 12) ? "PM" : "AM";
    hour = (hour > 12) ? hour - 12 : hour;
    hour = (hour == 0) ? 12 : hour;
    return hour + meridiem;
  };

  return (
    <div>
      <Row className='mx-5 my-5'>
        <Col xs={12} md={4} >
          <Image style={{ maxWidth: 'inherit' }} src={showData.show_pic}/> 
          <p> {days[showData.day_of_week]}s @ {convertTimeText(showData.start_time)} </p>
        </Col>
        <Col xs={11} md={6}>
          <p> {showData.show_name} </p>
          <p> {showData.show_desc} </p>
        </Col>
        <Col xs={1} md={1}>
        <Button variant="primary" onClick={() => console.log('hai :0)')}>
            Edit
          </Button>
        </Col>
      </Row>
      
    </div>
  );
}

export default Shows;