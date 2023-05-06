
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Form, Button, Modal } from "react-bootstrap";
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import useAdmin from "../hooks/useAdmin";
import { User } from "./types";
/*
  Author: Charlotte Harrington
  Description: This page displays a table of member information, only accessible by admins. Admins can update or delete users, as well as create new users in this view.
*/

function UserManager(){

  const [isAdmin, setIsAdmin] = useAdmin();
  
  const initialNewUser: User = {
    user_id: -1,
    username: "",
    password: "",
    email: "",
    first_name: "",
    last_name: "",
  };

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

const createUser = (newUser: User) => {
  let data = JSON.stringify(newUser);
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost/kanm-310/react/php/createUser.php?function=createUser',
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

const deleteUser = (userId: number) => {
  let data = JSON.stringify({ user_id: userId });
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost/kanm-310/react/php/deleteUser.php?function=deleteUser',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
      setUsers(users.filter(user => user.user_id !== userId));
    })
    .catch((error) => {
      console.log(error);
    });
}

  const [userToDelete, setUserToDelete] = useState(0);

  const handleDeleteUser = (user : User) => {
    setUserToDelete(user.user_id);
  };

  const handleConfirmDelete = () => {
    deleteUser(userToDelete);
    setUserToDelete(0);
  };

  const handleCancelDelete = () => {
    setUserToDelete(0);
    setAddingUser(false);
  };

  useEffect(() => {
      fetch('http://localhost/kanm-310/react/php/getUsers.php?function=getUsers')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<number | null>(null);
  const [addingUser, setAddingUser] = useState(false);
  const [newUser, setNewUser] = useState<User>(initialNewUser);

  const handleInputNewChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof User
  ) => {
    const value = e.target.value;
    setNewUser((prevNewUser) => ({ ...prevNewUser, [field]: value }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    userId: number,
    field: keyof User
  ) => {
    const newUsers = users.map((user) =>
      user.user_id === userId ? { ...user, [field]: e.target.value } : user
    );
    setUsers(newUsers);
  };

  const handleEditUser = (userId: number) => {
    setEditingUser(userId);
  };

  const handleAddUser = () => {
    setAddingUser(true);
  };

  const handleSaveUser = () => {
    const editedUser = users.find((user) => user.user_id === editingUser);
    updateUser(editedUser);
    setEditingUser(null);
  };

  const handleCreateUser = () => {
    createUser(newUser);
    setUsers([...users, newUser]);
    setAddingUser(false);
  };  
  

  return (
    <>
    {isAdmin && (
    <>
    <h2>Manage Users</h2>
      <Modal show={userToDelete !== 0} onHide={handleCancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete user {userToDelete}?
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleCancelDelete}>Cancel</button>
          <button onClick={handleConfirmDelete}>Delete</button>
        </Modal.Footer>
      </Modal>
    <Table responsive striped bordered hover style={{borderColor: "black", border: "2px"}}>
      <thead>
        <tr>
          <th></th>
          <th>Username</th>
          <th>Password</th>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Show Name</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.user_id}>
            <td>             
                {editingUser === user.user_id ? (
                <IconButton onClick={handleSaveUser}>
                  <SaveAltIcon/>
                </IconButton>
              ) : (
                <IconButton className="edit" onClick={() => handleEditUser(user.user_id)}>
                  <EditIcon/>
                </IconButton>
              )}
              </td>
            <td>
            {editingUser === user.user_id ? (
                    <Form.Control
                    type="text"
                    value={user.username}
                    onChange={(e) => handleInputChange(e, user.user_id, "username")}
                    required
                    />
                ) : (
                    user.username
                )}
            </td>
            <td>
                {editingUser === user.user_id ? (
                    <Form.Control
                    type="text"
                    value={user.password}
                    onChange={(e) => handleInputChange(e, user.user_id, "password")}
                    required
                    />
                ) : (
                    user.password
                )}
            </td>
            <td>
                {editingUser === user.user_id ? (
                    <Form.Control
                    type="text"
                    value={user.email}
                    onChange={(e) => handleInputChange(e, user.user_id, "email")}
                    required
                    />
                ) : (
                    user.email
                )}
            </td>
            <td>
            {editingUser === user.user_id ? (
                    <Form.Control
                    type="text"
                    value={user.first_name}
                    onChange={(e) => handleInputChange(e, user.user_id, "first_name")}
                    required
                    />
                ) : (
                    user.first_name
                )}
            </td>
            <td>
            {editingUser === user.user_id ? (
                    <Form.Control
                    type="text"
                    value={user.last_name}
                    onChange={(e) => handleInputChange(e, user.user_id, "last_name")}
                    required
                    />
                ) : (
                    user.last_name
                )}
            </td>
            <td>
              {user.show_name}
            </td>
            <td>
              <IconButton className="delete" onClick={() => handleDeleteUser(user)}>
                <DeleteIcon/>
              </IconButton>
            </td>
          </tr>
          
        ))}
        {addingUser && (
        <tr key="new">
          <td>
          <IconButton className="create" onClick={handleCreateUser}>
            <AddIcon/>
          </IconButton>
          </td>
          <td>
            <Form.Control
              type="text"
              value={newUser.username}
              onChange={(e) => handleInputNewChange(e, "username")}
              required
            />
          </td>
          <td>
            <Form.Control
              type="text"
              value={newUser.password}
              onChange={(e) => handleInputNewChange(e, "password")}
              required
            />
          </td>
          <td>
            <Form.Control
              type="text"
              value={newUser.email}
              onChange={(e) => handleInputNewChange(e, "email")}
              required
            />
          </td>
          <td>
            <Form.Control
              type="text"
              value={newUser.first_name}
              onChange={(e) => handleInputNewChange(e, "first_name")}
              required
            />
          </td>
          <td>
            <Form.Control
              type="text"
              value={newUser.last_name}
              onChange={(e) => handleInputNewChange(e, "last_name")}
              required
            />
          </td>   
          <td></td>
          <td>
          <IconButton className="delete" type="button" onClick={() => handleCancelDelete}>
            <DeleteIcon/>
          </IconButton>
          </td>
        </tr>
      )}
      </tbody>
    </Table>
    <button onClick={handleAddUser}>
      New User
    </button>
    </>
    )}
    {!isAdmin && (
      <>
      <div> Sorry, you don't have permission to access this page. </div>
      </>
    )}
    </>
  );
};


export default UserManager;

