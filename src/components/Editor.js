import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';
// import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js';
// import { useEffect, useLayoutEffect } from 'react';
// import 'draft-js/dist/Draft.css';

const PostEditor = ({ data = { title: '', id: undefined, content: ''}, readOnly = false, saveHandler = () => null } = {}) => {
  console.log(data, readOnly, saveHandler);
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  // const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  // const saveContent = (content) => {
  //   window.localStorage.setItem('content', JSON.stringify(convertToRaw(content)));
  // };

  // const onChangeState = (newState) => {
  //   const contentState = editorState.getCurrentContent();
  //   saveContent(contentState);
  //   console.log('content state', convertToRaw(contentState));
  //   setEditorState(newState);
  // };

  // useEffect(() => {
  //   // const content = window.localStorage.getItem('content');

  //   if (data) {
  //     setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(data))));
  //   } else {
  //     setEditorState(EditorState.createEmpty());
  //   }
  // }, [data]);

  const handleSave = (e) => saveHandler({ id: data.id, title, content }, e)


  return (
    <div>
      <div
        style={{
          display: 'block',
          // backgroundColor: 'whitesmoke',
          color: 'white',
          width: '600px',
          height: '800px',
          padding: '1rem',
          // borderRadius: '5px',
        }}
      >
        {/* <Editor
          readOnly={readOnly}
          editorState={editorState}
          onChange={onChangeState}
          customStyleMap={{
            backgroundColor: 'white',
            color: 'white',
          }}
        /> */}
        <Form>
     <Form.Group as={Row} controlId='formBasicEmail'>
          <Form.Label>TITLE</Form.Label>
          <Form.Control
            type='text'
            placeholder='...title'
            value={title}
            readOnly={readOnly}
            onChange={({ target: { value } }) => setTitle(value)}
          />
        </Form.Group>
  <Form.Group as={Row} controlId="formPlaintextEmail">
     <Form.Label>CONTENT</Form.Label>
      <Form.Control as="textarea" rows="10" value={content} readOnly={readOnly} onChange={({ target: { value } }) => setContent(value)} />
  </Form.Group>
      <Form.Group as={Row} controlId="formPlaintextEmail">
        <Button variant='info' className='text-light' onClick={handleSave} disabled={readOnly}>
          SAVE POST
        </Button>
    </Form.Group>
  </Form>
    </div>
    </div>
  );
};

export default PostEditor;
