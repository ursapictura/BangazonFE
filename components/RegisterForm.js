import PropTypes from 'prop-types';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { registerUser } from '../utils/auth'; // Update with path to registerUser
import { useAuth } from '../utils/context/authContext';

function RegisterForm() {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    uid: user.fbUser.uid,
    username: '',
    firstName: '',
    lastName: '',
    email: user.fbUser.email,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    registerUser(formData).then(() => updateUser(user.fbUser.uid));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>User Registration</Form.Label><br />
        <Form.Text className="text-muted">First Name</Form.Text>
        <Form.Control type="text" name="FirstName" required placeholder="First Name" onChange={handleChange} />
        <Form.Text className="text-muted">Last Name</Form.Text>
        <Form.Control type="text" name="LastName" required placeholder="Last Name" onChange={handleChange} />
        <Form.Text className="text-muted">Username</Form.Text>
        <Form.Control type="text" name="UserName" required placeholder="Enter User Name" onChange={handleChange} />
        <Form.Text className="text-muted">Please enter your email address</Form.Text>
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string.isRequired,
    username: PropTypes.string,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};

export default RegisterForm;
