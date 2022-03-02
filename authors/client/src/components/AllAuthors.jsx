import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
    Link
    } from 'react-router-dom'

const AllAuthors =(props)=>{

    let [allAuthors, setAllAuthors]= useState([])
    let [deleted, setDeleted] = useState(false)

    useEffect(()=>{
        axios.get('http://localhost:8000/api/authors')
            .then(res=>{
                console.log('response when getting all authors', res)
                setAllAuthors(res.data.results)
            })
            .catch(err=>console.log('error', err))
    }, [deleted, props.newAuthorAdded])

    
    const deleteAuthor = (authorId)=>{
        axios.delete(`http://localhost:8000/api/authors/delete/${authorId}`)
            .then(res=>{
                console.log("res when deleting->", res)
                setDeleted(!deleted)
            })
            .catch(err=> console.log("ERROR", err))
    }

    return(
        <div>
            <h3>All authors</h3>
            {allAuthors.map((authorObj, i)=>{
                return(
                    <div key={i} style={{border:'1px solid black'}}>
                        <h4><Link to={`/authors/${authorObj._id}`}>
                            {authorObj.fullName}</Link></h4>
                        <p>ID: {authorObj._id}</p>
                        <p><Link to={`/authors/edit/${authorObj._id}`} className='btn btn-warning'>Edit</Link></p>
                        <button onClick = {()=>deleteAuthor(authorObj._id)} className="btn btn-danger">Delete</button>
                    </div>
                )
            })}
        </div>
    )
}

export default AllAuthors;