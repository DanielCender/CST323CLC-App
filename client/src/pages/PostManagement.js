import { useState, useEffect, useLayoutEffect } from 'react';
import { Container, Row, Col, Button, Toast } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

// Helpers
import { listPostsByUser } from './../helpers/db/listPostsByUser';

export const PostManagement = () => {
  const history = useHistory();
  const [posts, setPosts] = useState([]);
  const [errMsg, setErrMsg] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const toggleShowToast = () => setShowToast(!showToast);

  const handleCreatePost = () => history.push('/post/create');

  // If user is not logged in, redirect them
  useLayoutEffect(() => {
    if (!window.localStorage.getItem('USER')) history.push('/login');
  }, []);

  useEffect(() => {
    const email = (JSON.parse(window.localStorage.getItem('USER')) || {}).email;
    listPostsByUser({ email })
      .then((res) => {
        setPosts(res);
      })
      .catch((e) => {
        setErrMsg(e.message);
      });
  }, []);

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
        <h1>MANAGE YOUR POSTS</h1>
      </div>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          borderTop: '15px solid #A0A09F',
        }}
        className='bg-dark pt-4 pb-4'
      >
        <Row className='d-flex justify-content-center align-items-center' style={{ width: '100%' }}>
          <Col style={{ maxWidth: '350px' }}>
            <Button
              block
              size='lg'
              variant='warning'
              type='button'
              className='text-light'
              onClick={handleCreatePost}
            >
              WRITE NEW POST
            </Button>
          </Col>
        </Row>
        <Row className='d-flex justify-content-center align-items-center' style={{ width: '100%' }}>
          <Col style={{ maxWidth: '450px' }} className='m-0 p-0 pt-4'>
            <h1 className='text-light m-0'>EDIT YOUR POSTS</h1>
          </Col>
        </Row>
        {posts.map((el) => {
          return (
            <Row key={el.ID}>
              <Col>
                <Link to={`/post/${el.ID}`}>
                  <Button variant='warning' type='button' size='lg'>
                    {el.Title}
                  </Button>
                </Link>
              </Col>
            </Row>
          );
        })}
        <Toast
          show={showToast}
          onClose={toggleShowToast}
          style={{ position: 'absolute', right: '30px', bottom: '30px' }}
        >
          <Toast.Header>
            <img src='holder.js/20x20?text=%20' className='rounded mr-2' alt='' />
            <strong className='mr-auto'>Error</strong>
          </Toast.Header>
          <Toast.Body>{errMsg}</Toast.Body>
        </Toast>
      </div>
    </Container>
  );
};

export default PostManagement;
