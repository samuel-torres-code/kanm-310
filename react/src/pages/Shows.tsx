
import { Button, Image, Row, Col, Form } from 'react-bootstrap';
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { ShowData, Comment } from './types.js';
import { days } from './types.js';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import useLocalStorageUserID from "../hooks/useLocalStorageUserID";
import useLocalStorageShowID from "../hooks/useLocalStorageShowID";


function Shows() {
  const { id } = useParams<{id: string}>();

  const [showData, setShowData] = useState<ShowData>({
    show_name: '',
    show_desc: '',
    show_pic: '',
    start_time: '12:00:00',
    end_time: '13:00:00',
    day_of_week: 0,
  });

  const [userID, setUserID] = useLocalStorageUserID();
  const [isEditingShow,setIsEditingShow] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>(showData.show_name);
  const [newDesc, setNewDesc] = useState<string>(showData.show_desc);
  const [newPic, setNewPic] = useState<string>(showData.show_pic);

  const [showID, setShowID] = useLocalStorageShowID();
  

  const [isLoading, setIsLoading] = useState<Boolean>(true);

  const [comments, setComments] = useState<Comment[]>([]);

  const [comment, setComment] = useState('');

  const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(comment);
    console.log(userID);
    console.log(id);

    const newComment =  {
      comment_id: -1,
      user_id: Number(userID) || 0,
      show_id: Number(id) || 0,
      comment_text: comment,
      time_stamp: "",
      username: "",
    }

    createComment(newComment);
    window.location.reload();
  };

  const createComment = (newComment: Comment) => {
    let data = JSON.stringify(newComment);
    console.log(data)
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost/kanm-310/react/php/createComment.php?function=createComment',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
  }

  
  useEffect(() => {
    // Make a GET request to the PHP backend function
    fetch(`http://localhost/kanm-310/react/php/getShows.php?function=getShowData&id=${id}`)
    .then(response => response.json())
    .then(data => {
      setShowData(data);
      setNewName(data.show_name);
      setNewDesc(data.show_desc);
      setNewPic(data.show_pic);
      if(data !== null) {
        setIsLoading(false);
      }
    });

}, []);
useEffect(() => {
  setIsLoading(true);
  // Make a GET request to the PHP backend function
  fetch(`http://localhost/kanm-310/react/php/getShows.php?function=getShowData&id=${id}`)
  .then(response => response.json())
  .then(data => {
    setShowData(data);
    if(data !== null) {
      setIsLoading(false);
    }
  });

}, [id]);

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

const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  setNewName(e.target.value);
};

const handleDescChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  setNewDesc(e.target.value);
};

const handlePicChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  setNewPic(e.target.value);
};

const handleShowSubmit = () => {
  setIsLoading(true);
  setShowData({...showData, show_name: newName,show_desc: newDesc, show_pic: newPic});
  let data = JSON.stringify({...showData, show_name: newName,show_desc: newDesc, show_pic: newPic});
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost/kanm-310/react/php/updateShow.php?function=updateShow',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  setIsEditingShow(false);
};


  return (

    <div>
      {!isLoading && 
      <Row className='mx-5 my-5'>
        
        {showID === id && !isEditingShow &&
        
          <>
          <Col xs={12} md={4} >
          <Image style={{ maxWidth: 'inherit' }} src={showData.show_pic}/> 
          <p> {days[showData.day_of_week]}s @ {convertTimeText(showData.start_time)} </p>
          </Col>
          <Col xs={11} md={6}>
            <p> {showData.show_name} </p>
            <p> {showData.show_desc} </p>
          </Col>
          <Col xs={1} md={1}>
          
          <Button variant="primary" onClick={() => setIsEditingShow(true)}>
              Edit
            </Button>
          </Col>
          </>
}
          {showID === id && isEditingShow &&
          <>
          <Col xs={12} md={4} >
          <Image style={{ maxWidth: 'inherit' }} src={newPic}/> 
          <Form.Group className="mb-3" >
              <Form.Label>Show Picture Link</Form.Label>
              <Form.Control
              type="text"
              size="lg"
              value={newPic}
              onChange={handlePicChange}
            />
            </Form.Group>
          <p> {days[showData.day_of_week]}s @ {convertTimeText(showData.start_time)} </p>
          </Col>
          <Col xs={11} md={6}>
            
            <Form.Group className="mb-3" >
              <Form.Label>Show Name</Form.Label>
              <Form.Control
              type="text"
              size="lg"
              value={newName}
              onChange={handleNameChange}
              maxLength={100}
            />
            </Form.Group>
            
            
            
            <Form.Group className="mb-3" >
              <Form.Label>Show Description</Form.Label>
              <Form.Control
              as="textarea"
              value={newDesc}
              onChange={handleDescChange}
              maxLength={255}
            />
            </Form.Group>
          </Col>
          <Col xs={1} md={1}>
          
          
            <Button variant="primary" onClick={() => handleShowSubmit()}>
              Save
            </Button>
            <Button variant="secondary" onClick={() => setIsEditingShow(false)}>
              Cancel
            </Button>
          </Col>
          </>
          }

      </Row>
}
{isLoading && 
    <Row className="justify-content-center my-5">
      
      <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
    </Row>
}

      

      {userID &&<Form onSubmit={handleSubmit}>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Write a comment:</Form.Label>
          <Form.Control as="textarea" rows={3} value={comment} onChange={handleCommentChange} />
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form> }

      <Table striped bordered hover>
        <thead>
          <tr>
          <th>Comment Author</th>
          <th>Timestamp</th>
          <th>Comment Text</th>
          </tr>
        </thead>
        <tbody>
          {comments
          .sort((obj1, obj2) => {
              if (obj1.time_stamp > obj2.time_stamp) return -1;
              return 1
            })
          .map((comment) => (
          <tr>
              <td>{comment.username}</td>
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