import './App.css';
import React, {useState} from 'react'
import NewProductForm from './components/NewProductForm';
import AllProducts from './components/AllProducts';
import EditProductForm from './components/EditProductForm';
import OneProduct from './components/OneProduct';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from 'react-router-dom'

function App() {
  let [newProductAdded, setNewProductAdded] = useState(false);

  return (
    <BrowserRouter>
      <div className="App container">
        <h1>Product Manager</h1>
        <Link to='/' className='btn btn-secondary'>Add Product</Link>
        <Switch>

        <Route exact path ='/'>
          <NewProductForm newProductAdded={newProductAdded} setNewProductAdded={setNewProductAdded}></NewProductForm>
          <hr/>
          <AllProducts newProductAdded={newProductAdded}></AllProducts>
        </Route>

        <Route exact path='/products/:id'>
          <OneProduct></OneProduct>
        </Route>

        <Route exact path='/products/edit/:id'>
          <EditProductForm></EditProductForm>
        </Route>

        </Switch>

      </div>
    </BrowserRouter>
  );
}

export default App;