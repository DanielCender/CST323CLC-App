import { useLayoutEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { LinkContainer } from 'react-router-bootstrap';

// Pages
import { Home, About, Posts, Login, Logout, Register, Account, Post, PostManagement, EditPost } from './pages';

export default function App() {
  const [authed, setAuthed] = useState(false)
  useLayoutEffect(() => {
    if(window.localStorage.getItem('USER')) setAuthed(true)
    else setAuthed(false)
  }, [])

  return (
    <Router>
      <Navbar collapseOnSelect bg='dark' expand='md' variant='dark'>
        <Navbar.Brand href="/" className='font-weight-bold text-muted' style={{width: '20%'}}>
          The "Blogs are Cool" Blog
        </Navbar.Brand>
        <Nav className="justify-content-center flex-grow-1" style={{width: '60%'}}>
          <Nav.Item>
            <LinkContainer to='/'>
              <Nav.Link>HOME</Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to='/about'>
              <Nav.Link>ABOUT</Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to='/posts'>
              <Nav.Link>FEED</Nav.Link>
            </LinkContainer>
          </Nav.Item>
          <Nav.Item>
            <LinkContainer to='/account'>
              <Nav.Link>ACCOUNT</Nav.Link>
            </LinkContainer>
          </Nav.Item>
        </Nav>
         <Nav className="justify-content-end" style={{width: '20%'}}>
          {authed && (<Nav.Item>
            <LinkContainer to={'/account/posts'}>
              <Nav.Link>WRITE</Nav.Link>
            </LinkContainer>
          </Nav.Item>)}
          <Nav.Item>
            <LinkContainer to={authed ? '/logout' : '/login'}>
              <Nav.Link>{authed ? 'LOGOUT' : 'LOGIN'}</Nav.Link>
            </LinkContainer>
          </Nav.Item>
          </Nav>
      </Navbar>
      {/* A <Switch> looks through its children <Route>s and
    renders the first one that matches the current URL. */}
      <Switch>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/login'>
          <Login />
        </Route>
        <Route path='/logout'>
          <Logout />
        </Route>
        <Route path='/register'>
          <Register />
        </Route>
        <Route exact path='/posts'>
          <Posts />
        </Route>
        <Route exact path='/account'>
          <Account />
        </Route>
        <Route path='/account/posts'>
          <PostManagement />
        </Route>
        <Route path='/post/:id'>
          <Post />
        </Route>
        <Route exact path='/post/create'>
          <EditPost />
        </Route>
        <Route path='/post/edit/:id'>
          <EditPost />
        </Route>
        <Route path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}
