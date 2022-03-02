import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { useHistory, useParams } from "react-router";

const EditAuthorForm = () =>{

    const { id } = useParams();

    //state variable to save the info i get back from api about one ninja (or one object)
    let [authorInfo, setAuthorInfo] = useState({
        fullName:""
    })

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/authors/${id}`)
        .then(res=>{
            console.log("response is this-->", res)
            setAuthorInfo(res.data.results)

        })
        .catch(err=> console.log(err))
    },[])

    //initialize useHistory so we can redirect after the update of the form
    const history = useHistory();

    const changeHandler = (e)=>{
        console.log("changed in form detected!!")
        if(e.target.type === "checkbox"){
            setAuthorInfo({
                ...authorInfo,
                [e.target.name]: e.target.checked
            })
        }else{
            setAuthorInfo({
                ...authorInfo,
                [e.target.name]: e.target.value
            })

        }
    }

    const updateSubmitHandler = (e)=>{
        e.preventDefault();
        axios.put(`http://localhost:8000/api/authors/update/${id}`, authorInfo)
            .then(res=>{
                console.log("res after put request-->", res)
                history.push("/")
            })
            .catch(err=>console.log(err))

    }

    return (
        <div>
            <h4>Edit Author</h4>
            <form onSubmit={updateSubmitHandler}>
                <div className='form-group'>
                    <label htmlFor=''>Full Name</label>
                    <input type="text" name="fullName" id="" className="form-control" value={authorInfo.fullName} onChange={changeHandler}/>
                </div>
                <input type='submit' value='Update' className='btn btn-success mt-3'></input>
            </form>
        </div>
    )
}

export default EditAuthorForm;