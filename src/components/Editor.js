import React, { useState } from 'react';
import { Editor, EditorState, convertToRaw, convertFromRaw } from 'draft-js';
import { useEffect, useLayoutEffect } from 'react';
import { Button } from 'react-bootstrap';
import 'draft-js/dist/Draft.css';

const PostEditor = ({ data = null, readOnly = false, saveHandler = () => null } = {}) => {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());

  const saveContent = (content) => {
    window.localStorage.setItem('content', JSON.stringify(convertToRaw(content)));
  };

  const onChangeState = (newState) => {
    const contentState = editorState.getCurrentContent();
    saveContent(contentState);
    console.log('content state', convertToRaw(contentState));
    setEditorState(newState);
  };

  useEffect(() => {
    // const content = window.localStorage.getItem('content');

    if (data) {
      setEditorState(EditorState.createWithContent(convertFromRaw(JSON.parse(data))));
    } else {
      setEditorState(EditorState.createEmpty());
    }
  }, [data]);

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
        <Editor
          readOnly={readOnly}
          editorState={editorState}
          onChange={onChangeState}
          customStyleMap={{
            backgroundColor: 'white',
            color: 'white',
          }}
        />
      </div>
      {readOnly === false && (
        <Button variant='info' className='text-light' onClick={saveHandler}>
          SAVE POST
        </Button>
      )}
    </div>
  );
};

export default PostEditor;
