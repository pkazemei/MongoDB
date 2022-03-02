import React, {useState} from 'react';
import axios from 'axios'
import {useHistory} from "react-router";


const NewAuthorForm = (props) =>{

    let [fullName, setFullName]= useState('');

    let [formErrors, setFormErrors] = useState({})
    const history = useHistory();

const submitHandler=(e)=>{
    e.preventDefault();
    console.log(fullName)
    let formInfoObj={fullName}
    axios.post('http://localhost:8000/api/authors', formInfoObj)
        .then(res=>{
            console.log('response after posting', res)
            if(res.data.error){
                setFormErrors(res.data.error.errors)
            }else{
                props.setNewAuthorAdded(!props.newAuthorAdded)
            }
        })
        .catch(err=>console.log('error in submitting post request', err))
}

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className='form-group'>
                    <label htmlFor=''>Full Name</label>
                    <input onChange={(e)=>(setFullName(e.target.value))}type='text' name='' id='' className='form-control'></input>
                    <p className="text-danger">{formErrors.fullName?.message}</p>
                </div>
                <input type='submit' value='Add author' className='btn btn-success mt-3'></input>
            </form>
        </div>
    )
}

export default NewAuthorForm;