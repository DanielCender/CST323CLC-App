import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Container, Row, Col, Button, Toast } from 'react-bootstrap';

// UI Comps
import PostEditor from '../components/Editor';

// Helpers
import { getPost } from './../helpers/db/getPost';

export const Post = () => {
  const history = useHistory();
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [errMsg, setErrMsg] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const toggleShowToast = () => setShowToast(!showToast);

  useEffect(() => {
    getPost({ id })
      .then((res) => {
        console.log('setting post: ', res);
        if (JSON.stringify(res) === JSON.stringify({})) {
          // Go back, no post exists for this id
          history.push('/posts');
        }
        setPost(res);
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
        <h1>POST</h1>
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
        <h2>{post.Title}</h2>
        {/** Render the DraftJS Editor (readonly) in here */}
        <PostEditor readOnly={true} data={post.Content || null} />
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

export default Post;
