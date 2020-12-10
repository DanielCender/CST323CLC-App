import { useState, useEffect, useLayoutEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import bcrypt from 'bcryptjs';

// Helpers
import { updateUser } from '../helpers/db/updateUser';

export const Account = () => {
  const history = useHistory();
  const [values, setValues] = useState({
    email: (JSON.parse(window.localStorage.getItem("USER")) || {}).Email,
    oldPassword: '',
    password: '',
  });
  const [updateResult, setUpdateResult] = useState(null);

  const handleEditPosts = () => history.push('/account/posts')

  // If user is not logged in, redirect them
  useLayoutEffect(() => {
    if (!window.localStorage.getItem('USER')) history.push('/login');
  }, []);

  // This effect will see changes after a successful account creation,
  //  and handle the redirect for us
  useEffect(() => {
    if (updateResult) setTimeout(() => history.push('/login'), 2000);
  }, [updateResult]);

  // General form handler
  const handleChange = (event) => {
    // Set all new values, including prior untouched ones
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    bcrypt.genSalt(10, function (err, salt) {
      console.log('salt: ', salt);
      console.log('pass: ', values.password);
      bcrypt.hash(values.password, salt, function (err, hash) {
        // Store hash in your password DB.
        updateUser({ ...values, password: hash })
          .then((_) => {
            // setUpdateResult(true)
          })
          .catch((e) => {
            console.log('error in update: ', e.message);
            setUpdateResult(false);
            alert('There was an error with the account update: ' + e.message);
          });
      });
    });
  };

  return (
    <Container fluid className='p-0 m-0' style={{ width: '100%', height: '100%' }}>
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
        className='bg-dark-gray'
      >
        <h1>ACCOUNT</h1>
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
         <Row className='d-flex justify-content-center align-items-center pt-4'>
        <Col style={{ maxWidth: '350px' }}>
            <Button block size='lg' variant='warning' type='button' className='text-light' onClick={handleEditPosts}>
              WRITE OR EDIT POSTS
            </Button>
        </Col>
      </Row>
        <Form onSubmit={handleSubmit} validated={!!updateResult}>
          {/* <Row>
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
          </Row> */}
          <Row>
            <Col>
              <h3 className='text-light'>UPDATE PASSWORD</h3>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId='formGroupPassword'>
                <Form.Label className='text-light'>OLD PASSWORD</Form.Label>
                <Form.Control
                  type='password'
                  name='oldPassword'
                  value={values.oldPassword}
                  onChange={handleChange}
                  required={true}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId='formGroupPassword'>
                <Form.Label className='text-light'>NEW PASSWORD</Form.Label>
                <Form.Control
                  type='password'
                  name='password'
                  value={values.password}
                  onChange={handleChange}
                  required={true}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className='justify-content-center d-flex'>
            <Col className='justify-content-center d-flex'>
              <Button variant='warning' type='submit' value='Submit' className='text-light'>
                UPDATE ACCOUNT
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    </Container>
  );
};

export default Account;
