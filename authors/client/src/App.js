import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react'
import NewAuthorForm from './components/NewAuthorForm';
import AllAuthors from './components/AllAuthors';
import OneAuthor from './components/OneAuthor';
import EditAuthorForm from './components/EditAuthorForm';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from 'react-router-dom'

function App() {
  let [newAuthorAdded, setNewAuthorAdded] = useState(false);

  return (
    <BrowserRouter>
      <div className="App container">
        <h1>Favorite Authors</h1>
        <Link to='/' className='btn btn-secondary'>Home</Link>
        <Switch>

        <Route exact path ='/'>
          <NewAuthorForm newAuthorAdded={newAuthorAdded} setNewAuthorAdded= {setNewAuthorAdded} ></NewAuthorForm>
          <hr/>
          <AllAuthors newAuthorAdded={newAuthorAdded}></AllAuthors>
        </Route>

        <Route exact path= '/authors/:id'>
          <OneAuthor></OneAuthor>
        </Route>

        <Route exact path= '/authors/edit/:id'>
          <EditAuthorForm></EditAuthorForm>
        </Route>

        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
