import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Signup.css";
import Alert from 'react-bootstrap/Alert';

function SignupForm({ signup }) {
  const history = useHistory();
  const INITIAL_STATE = {
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: ""
  }
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [isValid, setIsValid] = useState(true);

  const [formErrors, setFormErrors] = useState([]);

  console.debug(
    "SignupForm",
    "signup=", typeof signup,
    "formData=", formData,
    "formErrors=", formErrors,
  );

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log("SignupForm - handleSubmit - Form data:", {...formData, password: "[REDACTED]"});
    
    try {
      console.log("SignupForm - Attempting to call signup function");
      let result = await signup(formData);
      console.log("SignupForm - handleSubmit - Result:", result);

      if (result.success) {
        console.log("SignupForm - Registration successful, redirecting to home");
        setIsValid(true);
        history.push("/");
      } else {
        console.error("SignupForm - Registration failed:", result.errors);
        setIsValid(false);
        setFormErrors(result.errors || ["Unknown registration error"]);
      }
    } catch (error) {
      console.error("SignupForm - Unhandled error during signup:", error);
      setIsValid(false);
      setFormErrors(Array.isArray(error) ? error : [`Error: ${error.toString()}`]);
    }
  }

  return (

    <div className="form-group">

      <div> {isValid
        ? null
        : <Alert variant="danger">
            <p><strong>Registration failed:</strong></p>
            {formErrors.length ? 
              <ul>
                {formErrors.map((err, idx) => <li key={idx}>{err}</li>)}
              </ul> 
              : "Please check your information and try again."}
          </Alert>
      }

      </div>
      <div>
        <h1>Create an Account</h1>
      </div>

      <Form onSubmit={handleSubmit}>

        <Form.Group className="ml-3">
          <Form.Label htmlFor="username">Username</Form.Label>
          <Form.Control
            id="username"
            type="text"
            name="username"
            value={formData.username}
            placeholder="Username"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="ml-3">
          <Form.Label htmlFor="email">Email</Form.Label>
          <Form.Control
            id="email"
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="ml-3">
          <Form.Label htmlFor="firstName">First Name</Form.Label>
          <Form.Control
            id="firstName"
            type="text"
            name="firstName"
            value={formData.firstName}
            placeholder="First Name"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="ml-3">
          <Form.Label htmlFor="lastName">Last Name</Form.Label>
          <Form.Control
            id="lastName"
            type="text"
            name="lastName"
            value={formData.lastName}
            placeholder="Last Name"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="ml-3">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            id="password"
            type="password"
            name="password"
            value={formData.password}
            placeholder="Password"
            onChange={handleChange}
          />
        </Form.Group>

        <br></br>
        <Button block="true" size="lg" type="submit">
          Submit
        </Button>
      </Form>
    </div>

  );
}

export default SignupForm;