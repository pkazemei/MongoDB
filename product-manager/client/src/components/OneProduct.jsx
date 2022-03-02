import React, {useState, useEffect} from 'react';
import {useParams, useHistory} from 'react-router';
import axios from 'axios';

const OneProduct=()=>{

    const {id} = useParams();
    const [productDetails, setProductDetails] = useState({});
    const history = useHistory(); //to redirect after deleting a product


    useEffect(()=>{
        axios.get(`http://localhost:8000/api/products/${id}`)
        .then(res=>{
            console.log('response when making request for one product')
            setProductDetails(res.data.results)
        })
        .catch(err=> console.log(err))
    }, [id])

    const deleteProduct = ()=>{
        console.log("deleting")
        axios.delete(`http://localhost:8000/api/products/delete/${id}`)
            .then(res=>{
                console.log("response when deleting", res)
                history.push("/")
            })
            .catch(err=>console.log(err))
    }

    return(
        <div>
            <h4>Details about: {productDetails.title}</h4>
            <p>Price: {productDetails.price}</p>
            <p>Description: {productDetails.description}</p>
            <p>ID: {id}</p>
            <button onClick = {deleteProduct} className="btn btn-danger">Delete</button>
        </div>
    )
}

export default OneProduct;