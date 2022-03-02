import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react'
import NewNinjaForm from './components/NewNinjaForm';
import AllNinjas from './components/AllNinjas';
import OneNinja from './components/OneNinja';
import EditNinjaForm from './components/EditNinjaForm';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from 'react-router-dom'

function App() {
  let [newNinjaAdded, setNewNinjaAdded] = useState(false);

  return (
    <BrowserRouter>
      <div className="App container">
        <h1>NinjasDB</h1>
        <Link to='/' className='btn btn-secondary'>Add Ninja</Link>
        <Switch>

        <Route exact path ='/'>
          <NewNinjaForm newNinjaAdded={newNinjaAdded} setNewNinjaAdded= {setNewNinjaAdded} ></NewNinjaForm>
          <hr/>
          <AllNinjas newNinjaAdded={newNinjaAdded}></AllNinjas>
        </Route>

        <Route exact path= '/ninjas/:id'>
          <OneNinja></OneNinja>
        </Route>

        <Route exact path= '/ninjas/edit/:id'>
          <EditNinjaForm></EditNinjaForm>
        </Route>

        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
