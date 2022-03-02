import React, {useState} from 'react';
import axios from 'axios'
import {useHistory} from "react-router";


const NewProductForm = (props) =>{

    let [title, setTitle]= useState('');
    let [price, setPrice]= useState(0);
    let [description, setDescription]= useState('');

    let [formErrors, setFormErrors] = useState({})
    const history = useHistory();

const submitHandler=(e)=>{
    e.preventDefault();
    console.log(title, price, description)
    let formInfoObj={title, price, description}
    axios.post('http://localhost:8000/api/products', formInfoObj)
        .then(res=>{
            console.log('response after posting', res)
            if(res.data.error){
                setFormErrors(res.data.error.errors)
            }else{
                props.setNewProductAdded(!props.newProductAdded)
            }
        })
        .catch(err=>console.log('error in submitting post request', err))
}

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className='form-group'>
                    <label htmlFor=''>Title</label>
                    <input onChange={(e)=>(setTitle(e.target.value))}type='text' name='' id='' className='form-control'></input>
                    <p className="text-danger">{formErrors.title?.message}</p>
                </div>
                <div className='form-group'>
                    <label htmlFor=''>Price</label>
                    <input onChange={(e)=>(setPrice(e.target.value))}type='number' name='' id='' className='form-control'></input>
                    <p className="text-danger">{formErrors.price?.message}</p>
                </div>
                <div className='form-group'>
                    <label htmlFor=''>Description</label>
                    <input onChange={(e)=>(setDescription(e.target.value))}type='text' name='' id='' className='form-control'></input>
                    <p className="text-danger">{formErrors.description?.message}</p>
                </div>
                <input type='submit' value='Create' className='btn btn-success mt-3'></input>
            </form>
        </div>
    )
}

export default NewProductForm;