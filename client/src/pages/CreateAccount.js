import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import axios from "axios";

function CreateAccount() {
    const [validated, setValidated] = useState(false);
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [birthDate, setBirthDate] = useState("");
    
    const handleSubmit = async (event) => {
      event.preventDefault();

      const form = event.currentTarget;
      if (form.checkValidity() === false) {
          event.stopPropagation();
      } else {
          try {
              await axios.post("http://127.0.0.1:5000/login/create_account", {
                  login,
                  password,
                  email,
                  phone,
                  birth_date: birthDate
              });
              alert("Account created successfully");
          } catch (error) {
              console.error("Error creating account:", error);
              alert("An error occurred while creating the account.");
          }
      }

      setValidated(true);
  };

    return (
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom01">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="First name"
                    />
                    <Form.Control.Feedback>Correct</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom02">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Last name"
                    />
                    <Form.Control.Feedback>Correct</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="4" controlId="validationCustom03">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                        required
                        type="text"
                        placeholder="Username"
                        value={login} onChange={(e) => setLogin(e.target.value)}
                    />
                    <Form.Control.Feedback>Correct</Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} md="3" controlId="Email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" placeholder="Email" required
                    value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid email.
                    </Form.Control.Feedback>
                </Form.Group>
            </Row>
            <Row>
                <Form.Group as={Col} md="3" controlId="validationCustom04">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control type="text" placeholder="Phone" 
                    value={phone} onChange={(e) => setPhone(e.target.value)}/>
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid phone name.
                    </Form.Control.Feedback>
                </Form.Group>

            </Row>
            <Row>
                <Form.Group as={Col} md="3" controlId="validationCustom06">
                    <Form.Label>Birth date</Form.Label>
                    <Form.Control type="text" placeholder="Birth date" required
                    value={birthDate} onChange={(e) => setBirthDate(e.target.value)}/>
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid birth date.
                    </Form.Control.Feedback>
                </Form.Group>

            </Row>
            <Row>
                <Form.Group as={Col} md="3" controlId="validationCustom05">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" required
                    value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <Form.Control.Feedback type="invalid">
                        Please provide a valid password.
                    </Form.Control.Feedback>
                </Form.Group>

            </Row>
            <Form.Group className="mb-3">
                <Form.Check
                    required
                    label="Agree to terms and conditions"
                    feedback="You must agree before submitting."
                    feedbackType="invalid"
                />
            </Form.Group>
            <Button type="submit">Submit form</Button>
        </Form>
    );
}


export default CreateAccount;