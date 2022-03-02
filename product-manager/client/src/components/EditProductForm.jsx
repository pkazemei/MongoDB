import React, {useState, useEffect} from 'react';
import axios from 'axios'
import { useHistory, useParams } from "react-router";

const EditProductForm = () =>{

    const { id } = useParams();

    //state variable to save the info i get back from api about one product (or one object)
    let [productInfo, setProductInfo] = useState({
        title:'',
        price:0,
        description:''
    })

    useEffect(()=>{
        axios.get(`http://localhost:8000/api/products/${id}`)
        .then(res=>{
            console.log("response is this-->", res)
            setProductInfo(res.data.results)

        })
        .catch(err=> console.log(err))
    },[id])

    //initialize useHistory so we can redirect after the update of the form
    const history = useHistory();

    const changeHandler = (e)=>{
        console.log("changed in form detected!!")
        if(e.target.type === "checkbox"){
            setProductInfo({
                ...productInfo,
                [e.target.name]: e.target.checked
            })
        }else{
            setProductInfo({
                ...productInfo,
                [e.target.name]: e.target.value
            })

        }
    }

    const updateSubmitHandler = (e)=>{
        e.preventDefault();
        axios.put(`http://localhost:8000/api/products/update/${id}`, productInfo)
            .then(res=>{
                console.log("res after put request-->", res)
                history.push("/")
            })
            .catch(err=>console.log(err))

    }

    return (
        <div>
            <h4>Edit Product</h4>
            <form onSubmit={updateSubmitHandler}>
                <div className='form-group'>
                    <label htmlFor=''>Title</label>
                    <input type="text" name="title" id="" className="form-control" value={productInfo.title} onChange={changeHandler}/>
                </div>
                <div className='form-group'>
                    <label htmlFor=''>Price</label>
                    <input type="number" name="price" id="" className="form-control" value={productInfo.price} onChange={changeHandler}/>
                </div>
                <div className='form-group'>
                    <label htmlFor=''>Description</label>
                    <input type="text" name="description" id="" className="form-control" value={productInfo.description} onChange={changeHandler}/>
                </div>
                <input type='submit' value='Update' className='btn btn-success mt-3'></input>
            </form>
        </div>
    )
}

export default EditProductForm;