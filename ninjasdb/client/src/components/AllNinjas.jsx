import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {
    Link
  } from 'react-router-dom'

const AllNinjas =(props)=>{

    let [allNinjas, setAllNinjas]= useState([])
    let [deleted, setDeleted] = useState(false)

    useEffect(()=>{
        axios.get('http://localhost:8000/api/ninjas')
            .then(res=>{
                console.log('response when getting all ninjas', res)
                setAllNinjas(res.data.results)
            })
            .catch(err=>console.log('error', err))
    }, [deleted, props.newNinjaAdded])

    
    const deleteNinja = (ninjaId)=>{
        axios.delete(`http://localhost:8000/api/ninjas/${ninjaId}`)
            .then(res=>{
                console.log("res when deleting->", res)
                setDeleted(!deleted)
            })
            .catch(err=> console.log("ERROR", err))
    }

    return(
        <div>
            <h3>All the ninjas</h3>
            {allNinjas.map((ninjaObj, i)=>{
                return(
                    <div key={i} style={{border:'1px solid black'}}>
                        <h4><Link to={`/ninjas/${ninjaObj._id}`}>
                            {ninjaObj.firstName} {ninjaObj.lastName}</Link></h4>
                        <p>Number of belts: {ninjaObj.numBelts}</p>
                        <p>ID: {ninjaObj._id}</p>
                        <p><Link to={`/ninjas/edit/${ninjaObj._id}`} className='btn btn-warning'>Edit</Link></p>
                        <button onClick = {()=>deleteNinja(ninjaObj._id)} className="btn btn-danger">Delete Ninja</button>
                    </div>
                )
            })}
        </div>
    )
}

export default AllNinjas;