import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Toast } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Helpers
import { listAllPosts } from './../helpers/db/listAllPosts';

/**
 * Renders Posts page
 * @param useHistory
 * @param useParams
 * @param setPost
 * @param setErrMsg
 * @param setShowToast
 * @param useEffect
 * @param props
 * @param props.width
 * @param props.maxWidth
 * @param props.height
 * @param props.position
 * @param props.position.right
 * @param props.position.bottom
 * @param props.display
 * @param props.justifyContent
 * @param props.alignItems
 * @param props.borderTop
 * @param props.backgroundColor
 * @param props.marginBottom
 */
export const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [errMsg, setErrMsg] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const toggleShowToast = () => setShowToast(!showToast);

  useEffect(() => {
    listAllPosts()
      .then((res) => {
        console.log('setting posts: ', res);
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
        <h1>POST FEED</h1>
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

export default Posts;
