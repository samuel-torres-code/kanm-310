import { useState, useEffect } from 'react';
import { Form, Button} from "react-bootstrap";
import { TextField, IconButton } from '@mui/material';
import { Edit as EditIcon, Save as SaveIcon } from '@mui/icons-material';
import { User } from './types';
import useLocalStorageUserID from '../hooks/useLocalStorageUserID';
import axios from "axios";
/*
    Author: Charlotte Harrington
    Description: This page displays a user's own information, viewable and editable by only the user themself. Only accessible if logged in. 
*/

function UserProfile(){ 

    const defaultUser: User = {
        user_id: -1,
        username: "",
        password: "",
        email: "",
        first_name: "",
        last_name: "",
      };

    const [userID, setUserID] = useLocalStorageUserID();
    const loggedIn = (userID !== undefined);

    const [isEditMode, setIsEditMode] = useState(false);
    const [profile, setProfile] = useState<User>(defaultUser);
    const [isLoading, setIsLoading] = useState<Boolean>(true);

    useEffect(() => {
    fetch(`http://localhost/kanm-310/react/php/getUsers.php?function=getUserDataID&id=${userID}`)
    .then(response => response.json())
    .then(data => {
      setProfile(data);
      if(data !== null) {
        setIsLoading(false);
      }
    });

    }, []);
    useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost/kanm-310/react/php/getUsers.php?function=getUserDataID&id=${userID}`)
    .then(response => response.json())
    .then(data => {
        setProfile(data);
        if(data !== null) {
        setIsLoading(false);
        }
    });

    }, [userID]);

    const updateUser = (editedUser: User) => {
        let data = JSON.stringify(editedUser);
          
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://localhost/kanm-310/react/php/updateUser.php?function=updateUser',
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

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    setIsEditMode(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSaveUser = () => {
    updateUser(profile);
    setIsEditMode(false);
  };

  return (
    <div>
    {loggedIn && (
    <Form>
    <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control
            name="username"
            value={profile.username}
            onChange={handleChange}
            disabled={!isEditMode}
        />

    </Form.Group>
    <Form.Group>
        <Form.Label>Password</Form.Label>
        <Form.Control
            name="password"
            type="password"
            value={profile.password}
            onChange={handleChange}
            disabled={!isEditMode}
        />

    </Form.Group>
    <Form.Group>
        <Form.Label>First Name</Form.Label>
        <Form.Control
            name="firstName"
            value={profile.first_name}
            onChange={handleChange}
            disabled={!isEditMode}
        />

    </Form.Group>
    <Form.Group>
        <Form.Label>Last Name</Form.Label>
        <Form.Control
            name="lastName"
            value={profile.last_name}
            onChange={handleChange}
            disabled={!isEditMode}
        />
    </Form.Group>
    <Form.Group>
        <Form.Label>Email Address</Form.Label>
        <Form.Control
            name="email"
            type="email"
            value={profile.email}
            onChange={handleChange}
            disabled={!isEditMode}
        />

    </Form.Group>
    <IconButton onClick={handleEditClick}>
        <EditIcon />
    </IconButton>
      {isEditMode && (
        <IconButton onClick={handleSaveUser}>
          <SaveIcon />
        </IconButton>
      )}
      </Form>
    )}
    {!loggedIn && (
        <div> Sorry, you need to be logged in to access this page. </div>
    )}
    </div>
  );
};

export default UserProfile;

