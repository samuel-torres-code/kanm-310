
import React, { useEffect, useState } from "react";
import { Table, Form, Button } from "react-bootstrap";

type User = {
  user_id: number;
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
}

import { updateUser } from 'http://localhost/kanm-310/react/php/updateUser.php?function=updateUser';

function UserManager(){

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
      // Make a GET request to the PHP backend function
      fetch('http://localhost/kanm-310/react/php/getUsers.php?function=getUsers')
      .then(response => response.json())
      .then(data => setUsers(data));
  }, []);

  
  const [editingUser, setEditingUser] = useState<number | null>(null);

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

  const handleSaveUser = () => {
    // Find the edited user object
    const editedUser = users.find((user) => user.user_id === editingUser);
  
    // Call the updateUser function with the edited user object
    updateUser(editedUser);
  
    setEditingUser(null);
  };
  

  return (
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
      </tbody>
    </Table>
  );
};


export default UserManager;

