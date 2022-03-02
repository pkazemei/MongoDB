import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router';
import axios from 'axios';

const OneNinja=()=>{

    const {id} = useParams();
    const [ninjaDetails, setNinjaDetails] = useState({});
    const history = useHistory(); //to redirect after deleting a ninja


    useEffect(()=>{
        axios.get(`http://localhost:8000/api/ninjas/${id}`)
        .then(res=>{
            console.log('response when making request for one ninja')
            setNinjaDetails(res.data.results)
        })
        .catch(err=> console.log(err))
    }, [])

    const deleteNinja = ()=>{
        console.log("deleting")
        axios.delete(`http://localhost:8000/api/ninjas/${id}`)
            .then(res=>{
                console.log("response when deleting", res)
                history.push("/")
            })
            .catch(err=>console.log(err))
    }

    return(
        <div>
            <h4>Details about {ninjaDetails.firstName} {ninjaDetails.lastName}</h4>
            <p>Number of Belts: {ninjaDetails.numBelts}</p>
            <p>Veteran status: {ninjaDetails.isVeteran? 'Is a Veteran': 'Not a Veteran'}</p>
            <p>ID: {id}</p>
            <button onClick = {deleteNinja} className="btn btn-danger">Delete Ninja</button>
        </div>
    )
}

export default OneNinja;