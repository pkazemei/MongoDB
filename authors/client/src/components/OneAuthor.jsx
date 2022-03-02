import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router';
import axios from 'axios';

const OneAuthor=()=>{

    const {id} = useParams();
    const [authorDetails, setAuthorDetails] = useState({});
    const history = useHistory(); //to redirect after deleting an author


    useEffect(()=>{
        axios.get(`http://localhost:8000/api/authors/${id}`)
        .then(res=>{
            console.log('response when making request for one author')
            setAuthorDetails(res.data.results)
        })
        .catch(err=> console.log(err))
    }, [])

    const deleteAuthor = ()=>{
        console.log("deleting")
        axios.delete(`http://localhost:8000/api/authors/delete/${id}`)
            .then(res=>{
                console.log("response when deleting", res)
                history.push("/")
            })
            .catch(err=>console.log(err))
    }

    return(
        <div>
            <h4>Details about {authorDetails.fullName}</h4>
            <p>ID: {id}</p>
            <button onClick = {deleteAuthor} className="btn btn-danger">Delete author</button>
        </div>
    )
}

export default OneAuthor;