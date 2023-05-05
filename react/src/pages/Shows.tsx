
import { Button, Image, Row, Col, Form, Accordion, Card,ListGroup} from 'react-bootstrap';
import axios from "axios";
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { ShowData, Comment, User, UserShowData, ShowSets, SongPlay } from './types.js';
import { days } from './types.js';
import Table from 'react-bootstrap/Table';
import Spinner from 'react-bootstrap/Spinner';
import useLocalStorageUserID from "../hooks/useLocalStorageUserID";
import useLocalStorageShowID from "../hooks/useLocalStorageShowID";
import useAdmin from '../hooks/useAdmin.js';
import { IconButton } from '@mui/material';
import { Edit as EditIcon } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
/*
Author: Liam Ramsey, Samuel Torres, and Elijah Sanders
Description: Displays and allows DJs and hosts to edit a page for a show and comments
*/

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

  const [ DJs, setDJs] = useState<UserShowData[]>([]);

  const [userID, setUserID] = useLocalStorageUserID();
  const [isEditingShow,setIsEditingShow] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>(showData.show_name);
  const [newDesc, setNewDesc] = useState<string>(showData.show_desc);
  const [newPic, setNewPic] = useState<string>(showData.show_pic);
  const [showSets, setShowSets] = useState<ShowSets>({});

  const [showID, setShowID] = useLocalStorageShowID();
  const [isAdmin, setIsAdmin] = useAdmin();

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
      window.location.reload();
    })
    .catch((error) => {
      console.log(JSON.stringify(error));
    });
  }

  // The following code (lines 97-150):
  // Author: Liam Ramsey
  // Description: Integrates updating and deleting comments using react and the backend functions

  const [editIndex, setEditIndex] = useState(-1);
  const [editedComment, setEditedComment] = useState('');
  const [editedCommentID, setEditedCommentID] = useState(-1);

  const handleEditClick = (index: number, commentText: string, editedID: number) => {
    setEditIndex(index);
    setEditedComment(commentText);
    setEditedCommentID(editedID);
  };

  const handleCancelClick = () => {
    setEditIndex(-1);
    setEditedComment('');
  };

  function updateComment(commentId: number, newCommentText: string): Promise<void> {
    return axios.post('http://localhost/kanm-310/react/php/updateComment.php?function=updateComment', {
      comment_id: commentId,
      new_comment_text: newCommentText,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  function deleteComment(commentId: number): Promise<void> {
    return axios.post('http://localhost/kanm-310/react/php/deleteComment.php?function=deleteComment', {
      comment_id: commentId
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  const handleSaveClick = (index: number) => {
    // handle saving edited comment to backend
    updateComment(editedCommentID, editedComment)
      .then(() => {
        // Once the update is complete, reset the editing state
        setEditedCommentID(-1);
        setEditedComment('');
        setEditIndex(-1);
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDeleteComment = (commentID: number) => {
    deleteComment(commentID);
    window.location.reload();
  }

  /*
    Author: Samuel Torres
    Description: Grabs show and DJ info from DB on page load
  */
  useEffect(() => {
    // Make a GET request to the PHP backend function
    fetch(`http://localhost/kanm-310/react/php/getShows.php?function=getExtendedShowData&id=${id}`)
    .then(response => response.json())
    .then(data => {
      if(data.length >= 1) {
        setShowData({show_id: id,show_name: data[0].show_name,
        show_desc: data[0].show_desc,
        show_pic: data[0].show_pic,
        start_time: data[0].start_time,
        end_time: data[0].end_time,
        day_of_week: data[0].day_of_week});
        setDJs(data);
        console.log(data);
        setNewName(data[0].show_name);
        setNewDesc(data[0].show_desc);
        setNewPic(data[0].show_pic);
        fetch(`http://localhost/kanm-310/react/php/getSets.php?function=getSetsByShowID&id=${id}`)
  .then(response => response.json())
  .then(data => {setShowSets( data.reduce((acc: ShowSets, curr: SongPlay) => {
    const set_id = curr.set_id;
    if (!acc[set_id]) {
      acc[set_id] = [];
    }
    acc[set_id].push(curr);
    console.log("test", acc, curr)
    return acc;
  }, {}) );
  setIsLoading(false);});
        
      }
      
      else{
        setIsLoading(false);
      }
    });

}, []);
// useEffect(() => {
//   setIsLoading(true);
//   // Make a GET request to the PHP backend function
//   fetch(`http://localhost/kanm-310/react/php/getShows.php?function=getShowData&id=${id}`)
//   .then(response => response.json())
//   .then(data => {
//     setShowData(data);
//     if(data !== null) {
//       setIsLoading(false);
//     }
//   });

// }, [id]);

  /*
    Author: Samuel Torres
    Description: Converts string of SQL datetime to just the hour and AM/PM
  */
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

//http://localhost/kanm-310/react/php/getSets.php?function=getSetsByShowID&id=2
useEffect(() => {
  // Make a GET request to the PHP backend function
  
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

/*
    Author: Samuel Torres
    Description: Sends updated show information to the DB for updating
*/
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

const handleTest = () => {
  console.log("test")
}

const handlePlayDelete = (set_id : string, track_id : string) => {
  let data = JSON.stringify({set_id: set_id, track_id: track_id});

  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost/kanm-310/react/php/deletePlay.php?function=deletePlay',
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  };

  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    window.location.reload();
  })
  .catch((error) => {
    console.log(error);
  });
}

  return (

    <div>
      {!isLoading && 
      <Row className='mx-5 my-5'>
        
        {!isEditingShow &&
        
          <>
          <Col xs={12} md={4} >
          <Image style={{ maxWidth: 'inherit' }} src={showData.show_pic}/> 
          <p> {days[showData.day_of_week]}s @ {convertTimeText(showData.start_time)} </p>
          </Col>
          <Col xs={11} md={6}>
            <p> {showData.show_name} </p>
            <p> {showData.show_desc} </p>

            <p> DJs: {DJs.map((user,i) => {
              if(i == DJs.length-1) {
                return user.username
              }
              else {
                return user.username + " and "
              }
              
            })} </p>
      
      <Accordion>
      {Object.entries(showSets).map(([setId, trackList]) => (
        <Accordion.Item eventKey={setId}>
        <Accordion.Header>
          {trackList.length >= 1? trackList[0].set_date : "Unknown Date" }
          
        </Accordion.Header>
        <Accordion.Body>
          <ListGroup>
            {trackList.map((track) => (
              <ListGroup.Item key={track.track_id}>
                {track.time_stamp}: {track.track_name} - {track.track_artist}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Accordion.Body>
      </Accordion.Item>
        // <Card key={setId}>
        //   <Accordion.Toggle as={Card.Header} eventKey={setId}>
        //     Set {setId}
        //   </Accordion.Toggle>
        //   <Accordion.Collapse eventKey={setId}>
        //     <Card.Body>
        //       <ul>
        //         {trackList.map((track) => (
        //           <li key={track.track_id}>
        //             {track.track_name} - {track.track_artist}
        //           </li>
        //         ))}
        //       </ul>
        //     </Card.Body>
        //   </Accordion.Collapse>
        // </Card>
      ))}
    </Accordion> 
          </Col>
          <Col xs={1} md={1}>
          {(showID === id || isAdmin) &&
          <Button variant="primary" onClick={() => setIsEditingShow(true)}>
              Edit
            </Button>
}
          </Col>
          </>
}
          {isEditingShow &&
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
            <div className='pt-2'>
              <Button variant="secondary" onClick={() => setIsEditingShow(false)}>
                Cancel
              </Button>
            </div>
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

      
      {/* 
        Author: Liam Ramsey
        Description: Displays a comment box if a user is signed in and displays all comments in a table.  
      */}

      {userID &&<Form onSubmit={handleSubmit}>
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Label>Write a comment:</Form.Label>
          <Form.Control as="textarea" rows={3} value={comment} onChange={handleCommentChange} />
        </Form.Group>
        <div className='py-2'>
          <Button type="submit">Submit</Button>
        </div>
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
          .map((comment, index) => (
          <tr key ={comment.time_stamp}>
              <td>{comment.username}</td>
              <td>{comment.time_stamp}</td>
              <td>
                {editIndex === index ? (
                  <>
                    <input
                      type="text"
                      value={editedComment}
                      onChange={(e) => setEditedComment(e.target.value)}
                    />
                    <button onClick={() => handleSaveClick(index)}>Save</button>
                    <button onClick={() => handleCancelClick()}>Cancel</button>
                  </>
                ) : (
                  comment.comment_text
                )}
              </td>
              { (userID === comment.user_id || isAdmin) && (
                <td>
                  {editIndex === index ? null : (
                    <IconButton onClick={() => handleEditClick(index, comment.comment_text, comment.comment_id)}>
                      <EditIcon />
                    </IconButton>
                  )}
                </td>
              )}
              { (userID === comment.user_id || isAdmin) && (
                <td>
                  {editIndex === index ? null : (
                    <IconButton onClick={() => handleDeleteComment(comment.comment_id)}>
                      <DeleteIcon />
                    </IconButton>
                  )}
                </td>
              )}
          </tr>
            ))}
        </tbody>
      </Table>
      
    </div>
  );
}

export default Shows;