import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { Col, Container, Form, Button, Row } from "react-bootstrap";
import { UserContext } from "../App";
import { useHistory } from "react-router";

const DEFAULT_FORM_OBJECT = {
  username: "",
  password: "",
};

export const RegisterPage = () => {
  const [form, setForm] = useState(DEFAULT_FORM_OBJECT);
  const [user, setUser] = useContext(UserContext);
  const history = useHistory();

  const updateFormValue = (key) => (e) => {
    setForm({
      ...form,
      [key]: e.currentTarget.value,
    });
  };

  const registerUser = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/register", form);
    const response = await axios.post("http://localhost:8080/login", form);
    const { token, user } = response.data;
    setUser({
      token,
      user,
    });
    history.push("/");
  };

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col xs={6}>
          <h1>Register</h1>

          <Form onSubmit={registerUser}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                onChange={updateFormValue("username")}
                value={form.username}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                onChange={updateFormValue("password")}
                value={form.password}
                type="password"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
};
