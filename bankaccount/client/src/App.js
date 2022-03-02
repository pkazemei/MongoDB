import './App.css';
import {BrowserRouter, Link, Route, Switch} from 'react-router-dom';
import SignIn from './components/SignIn';
import UserHome from './components/UserHome';
import EditUserForm from './components/EditUserForm';
import Withdraw_Deposit from './components/Withdraw_Deposit';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <div className="jumbotron">
        <h1>P&D Bank</h1>
        <Switch>
          <Route exact path = "/">
            <SignIn></SignIn>
          </Route>
          <Route exact path="/home">
            <UserHome></UserHome>
          </Route>
          <Route exact path='/users/edit'>
            <EditUserForm></EditUserForm>
          </Route >
          <Route exact path='/users/w_d'>
            <Withdraw_Deposit></Withdraw_Deposit>
          </Route>
        </Switch>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;