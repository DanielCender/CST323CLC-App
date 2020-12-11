import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Toast } from 'react-bootstrap';

// UI Comps
import PostEditor from '../components/Editor';

// Helpers
import { savePost } from './../helpers/db/savePost';

/**
 * Renders the editPost page
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
export const CreatePost = () => {
  const history = useHistory();
  const [msg, setMsg] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const toggleShowToast = () => setShowToast(!showToast);

  const handleSubmit = (data, event) => {
    event.preventDefault();
    const { title, content, id } = data;
    const author = (JSON.parse(window.localStorage.getItem('USER')) || {}).email;
    // Store hash in your password DB.
    savePost({ id, title, content, author })
      .then((_) => {
        setMsg('Post saved successfully!');
        setTimeout(() => history.goBack(), 1000);
      })
      .catch((e) => {
        console.log('error in registration: ', e.message);
        setMsg(e.message);
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
        <h1>CREATE POST</h1>
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
        {/** Render the DraftJS Editor (readonly) in here */}
        <PostEditor readOnly={false} saveHandler={handleSubmit} />
        <Toast
          show={showToast}
          onClose={toggleShowToast}
          style={{ position: 'absolute', right: '30px', bottom: '30px' }}
        >
          <Toast.Header>
            <img src='holder.js/20x20?text=%20' className='rounded mr-2' alt='' />
            <strong className='mr-auto'>Error</strong>
          </Toast.Header>
          <Toast.Body>{msg}</Toast.Body>
        </Toast>
      </div>
    </Container>
  );
};

export default CreatePost;
