
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Form, Button } from "react-bootstrap";

type User = {
  user_id: number;
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
}


function UserManager(){

  
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

  useEffect(() => {
      // Make a GET request to the PHP backend function
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
    // Find the edited user object
    const editedUser = users.find((user) => user.user_id === editingUser);
  
    // Call the updateUser function with the edited user object
    updateUser(editedUser);
  
    setEditingUser(null);
  };

  const handleCreateUser = () => {
    // Call the PHP function to create a new user
    createUser(newUser);
    // Add the new user to the list of users and stop adding a new user
    setUsers([...users, newUser]);
    setAddingUser(false);
  };  
  

  return (
    <>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th></th>
          <th>user_id</th>
          <th>username</th>
          <th>password</th>
          <th>email</th>
          <th>first_name</th>
          <th>last_name</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.user_id}>
            <td>             
                {editingUser === user.user_id ? (
                <Button variant="success" onClick={handleSaveUser}>
                  Save
                </Button>
              ) : (
                <Button variant="primary" onClick={() => handleEditUser(user.user_id)}>
                  Edit
                </Button>
              )}
              </td>
            <td>{user.user_id}</td>
            <td>
            {editingUser === user.user_id ? (
                    <Form.Control
                    type="text"
                    value={user.username}
                    onChange={(e) => handleInputChange(e, user.user_id, "username")}
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
                    />
                ) : (
                    user.last_name
                )}
            </td>
          </tr>
        ))}
        {addingUser && (
        <tr key="new">
          <td>
            <Button variant="success" onClick={handleCreateUser}>
              Create
            </Button>
          </td>
          <td></td>
          <td>
            <Form.Control
              type="text"
              value={newUser.username}
              onChange={(e) => handleInputNewChange(e, "username")}
            />
          </td>
          <td>
            <Form.Control
              type="text"
              value={newUser.password}
              onChange={(e) => handleInputNewChange(e, "password")}
            />
          </td>
          <td>
            <Form.Control
              type="text"
              value={newUser.email}
              onChange={(e) => handleInputNewChange(e, "email")}
            />
          </td>
          <td>
            <Form.Control
              type="text"
              value={newUser.first_name}
              onChange={(e) => handleInputNewChange(e, "first_name")}
            />
          </td>
          <td>
            <Form.Control
              type="text"
              value={newUser.last_name}
              onChange={(e) => handleInputNewChange(e, "last_name")}
            />
          </td>
        </tr>
      )}

      </tbody>
    </Table>
    <Button variant="primary" onClick={handleAddUser}>
      New User
    </Button>
    </>
  );
};


export default UserManager;

