import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Jumbotron, Button, Row, Col, Toast } from 'react-bootstrap';

/**
 * Renders the home page
 * @param useHistory
 * @param setShowToast
 * @param handleLogin
 * @param handleRegister
 * @param props
 * @param props.width
 * @param props.maxWidth
 * @param props.height
 * @param props.position
 * @param props.position.right
 * @param props.position.bottom
 * @param props.
 * @param props.display
 * @param props.justifyContent
 * @param props.alignItems
 * @param props.borderTop
 * @param props.backgroundColor
 * @param props.marginBottom
 */
export const Home = () => {
  const history = useHistory()

  const [showToast, setShowToast] = useState(false)
  const toggleShowToast = () => setShowToast(!showToast)

  const handleRegister = () => {
    if(window.localStorage.getItem("USER")) toggleShowToast()
    else history.push('/register')
  }
  const handleLogin = () => {
    if(window.localStorage.getItem("USER")) toggleShowToast()
    else history.push('/login')
  }

  return (
    <Jumbotron className='ml-0 mr-0 pr-0 pl-0' style={{ height: '100%' }}>
      <h1 className='d-block justify-content-center text-center'>
        Read interesting things,
        <br />
        even if you don't want to.
      </h1>
      <Row className='d-flex justify-content-center align-items-center pt-4'>
        <Col style={{ maxWidth: '350px' }}>
            <Button block size='lg' variant='warning' type='button' className='text-light' onClick={handleRegister}>
              CREATE ACCOUNT
            </Button>
        </Col>
      </Row>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'flex-start',
          borderTop: '15px solid #A0A09F',
        }}
        className='bg-dark mt-4 pt-4'
      >
        <Row className='d-flex justify-content-center align-items-center' style={{ width: '100%' }}>
          <Col style={{ maxWidth: '350px' }}>
              <Button block size='lg' variant='warning' type='button' className='text-light' onClick={handleLogin}>
                LOGIN
              </Button>
          </Col>
        </Row>
         <Toast show={showToast} onClose={toggleShowToast} style={{position: 'absolute', right: '30px', bottom: '30px'}}>
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded mr-2"
              alt=""
            />
            <strong className="mr-auto">Notice</strong>
          </Toast.Header>
          <Toast.Body>You're already logged in, check out some posts!</Toast.Body>
        </Toast>
      </div>
    </Jumbotron>
  );
};

export default Home;
