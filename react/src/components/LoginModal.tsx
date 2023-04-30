import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

interface LoginModalProps {
  show: boolean;
  onHide: () => void;
  onLogin: (username: string, password: string) => void;
}

function LoginModal({ show, onHide, onLogin }: LoginModalProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authStatus, setAuthStatus] = useState<"pending" | "error" | "success">(
    "pending"
  );

  const handleLogin = async () => {
    setAuthStatus("pending");
    try {
      // Perform authentication
      const response = await fetch(
        `http://localhost/kanm-310/react/php/getUsers.php?function=getUserData&username=${username}&password=${password}`
      );
      
        
      if (response.ok) {
        // Authentication succeeded
        setAuthStatus("success");
        onLogin(username, password);
        onHide();
      } else {
        // Authentication failed
        setAuthStatus("error");
      }
    } catch (error) {
      console.error(error);
      setAuthStatus("error");
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {authStatus === "error" && (
          <div className="text-danger mb-3">Invalid username or password.</div>
        )}
        <Form>
          <Form.Group controlId="formUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleLogin}>
          Login
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default LoginModal;
