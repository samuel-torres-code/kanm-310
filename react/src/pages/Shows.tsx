import { Button, Image, Row, Col } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { ShowData, Comment } from './types.js';
import { days } from './types.js';
import Table from 'react-bootstrap/Table';

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

  const [comments, setComments] = useState<Comment[]>([]);

  
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

  useEffect(() => {
    // Make a GET request to the PHP backend function
    fetch(`http://localhost/kanm-310/react/php/getComments.php?function=getComments&input=${id}`)
    .then(response => response.json())
    .then(data => setComments(data));
}, []);

  console.log(comments);

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

      <Table striped bordered hover>
        <thead>
          <tr>
          <th>Timestamp</th>
          <th>Comment Text</th>
          </tr>
        </thead>
        <tbody>
          {comments
          .sort((obj1, obj2) => {
              if (obj1.comment_id > obj2.comment_id) return 1;
              if (obj2.comment_id > obj1.comment_id) return -1;
              return 0;
            })
          .map((comment) => (
          <tr>
              <td>{comment.time_stamp}</td>
              <td>{comment.comment_text}</td>
          </tr>
            ))}
        </tbody>
      </Table>
      
    </div>
  );
}

export default Shows;