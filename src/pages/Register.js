import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import bcrypt from 'bcryptjs'

// Helpers
import { registerUser } from '../helpers/db/registerUser'

export const Register = () => {
    const history = useHistory()
const [values, setValues] = useState({ firstName: '', lastName: '', email: '', password: '' });
const [registrationResult, setRegistrationResult] = useState(null)

    // This effect will see changes after a successful account creation,
    //  and handle the redirect for us
    useEffect(() => {
        if(registrationResult) setTimeout(() => history.push('/login'), 2000)
    }, [registrationResult])


  /**
   * Handles form input
   * @param {} event 
   */
  // General form handler
  const handleChange = (event) => {
    // Set all new values, including prior untouched ones
    setValues(prev => ({ ...prev, [event.target.name]: event.target.value }));
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    bcrypt.genSalt(10, function(err, salt) {
        console.log('salt: ', salt)
        console.log('pass: ', values.password);
    bcrypt.hash(values.password, salt, function(err, hash) {
        // Store hash in your password DB.
        registerUser({ ...values, password: hash }).then(_ => {
            // setRegistrationResult(true)
        }).catch(e => {
            console.log('error in registration: ', e.message)
            setRegistrationResult(false)
            alert('There was an error with the registration: ' + e.message)
        })
    });
});
  }

    return (
      <Container fluid className='p-0 m-0' style={{width: '100%', height: '100%'}}>
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}
          className='bg-dark-gray'
        >
          <h1>CREATE USER</h1>
        </div>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            borderTop: '15px solid #A0A09F',
          }}
          className='bg-dark pt-4 pb-4'
        >
          <Form onSubmit={handleSubmit} validated={!!registrationResult}>
            <Row>
              <Col>
                <Form.Group controlId='formGroupFirstName'>
                  <Form.Label className='text-light'>FIRST NAME</Form.Label>
                  <Form.Control
                    type='text'
                    name='firstName'
                    value={values.firstName}
                    onChange={handleChange}
                    placeholder='John'
                    required={true}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='formGroupEmail'>
                  <Form.Label className='text-light'>EMAIL</Form.Label>
                  <Form.Control
                    type='email'
                    name='email'
                    value={values.email}
                    onChange={handleChange}
                    placeholder='name@gmail.com'
                    required={true}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId='formGroupLastName'>
                  <Form.Label className='text-light'>LAST NAME</Form.Label>
                  <Form.Control
                    type='text'
                    name='lastName'
                    value={values.lastName}
                    onChange={handleChange}
                    placeholder='Smith'
                    required={true}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId='formGroupPassword'>
                  <Form.Label className='text-light'>PASSWORD</Form.Label>
                  <Form.Control
                    type='password'
                    name='password'
                    value={values.password}
                    onChange={handleChange}
                    placeholder='Smith'
                    required={true}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row className="justify-content-center d-flex">
                <Col className="justify-content-center d-flex">
                <Button variant="warning" type='submit' value='Submit' className="text-light">
                    REGISTER
                </Button>
                </Col>
            </Row>
            </Form>
        </div>
      </Container>
    );
}

export default Register;
