import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory, useParams } from "react-router";
import { Link } from 'react-router-dom';

const EditUserForm = () => {
    let [userInfo, setUserInfo] = useState({})
    let [savings, setSavings] = useState(null);
    let [swiss, setSwiss] = useState(null);
    const { id } = useParams();
    const history = useHistory();
    const [errors, setErrors] = useState({});
    const [zero] = useState(0);

    const changeHandler = (e) => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleDropdownChange = (e) => {
        let usercopy = { ...userInfo }
        e.preventDefault();
        console.log('pre-adding account', userInfo)
        if (userInfo.swiss != 0) {
            usercopy.swiss = swiss;
            console.log('swiss:', usercopy.swiss)
            axios.put(`http://localhost:8000/api/users/edit`, usercopy, { withCredentials: true })
                .then(res => {
                    console.log("res after put request-->", res)
                    history.push(`/home`)
                })
                .catch(err => console.log(err))
        }
        if (userInfo.savings != 0) {
            usercopy.savings = savings;
            console.log('savings', usercopy)
            console.log(id)
            axios.put(`http://localhost:8000/api/users/edit`, usercopy, { withCredentials: true })
                .then(res => {
                    console.log("res after put request-->", res)
                    history.push(`/home`)
                })
                .catch(err => console.log(err))
        }
        else {
            return;
        }
    };

    const updateUserInfo = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/users/edit`, userInfo, { withCredentials: true })
            .then(res => {
                if (res.data.errors) {
                    setErrors(res.data.errors);
                }
                else{
                    console.log("res after put request-->", res)
                    history.push(`/home`)
                }
            })
            .catch(err => console.log(err))
    }

    const deleteUser = (e) => {
        axios.delete(`http://localhost:8000/api/users/delete`, { withCredentials: true })
            .then(res => {
                console.log('successful deletion ->', res)
                history.push(`/`)
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/getloggedinuser", { withCredentials: true })
            .then(res => {
                // console.log("loggedin info ", res)
                setUserInfo(res.data.results)
            })
            .catch(err => {
                console.log("err", err)
                history.push("/")
            })
    }, [])

    return (
        <div className='container form-control' style={{width: 800}}>

            <div className='d-inline-block'>
                <Link className='btn btn-sm btn-primary' to={`/home`}>Home</Link>
                <button onClick={deleteUser} className='btn btn-danger btn-sm ms-4 me-4'>Close User account</button>
            </div>

            <div className='d-flex align-items-center'>

                <form className="form-control mt-5 container" style={{width: 400}} onSubmit={updateUserInfo}>
                    <label>Edit user info:</label>
                    <table className=''>
                        <tbody>
                            <tr>
                                <td>First Name:</td>
                                <td><input type="text" onChange={changeHandler} value={userInfo.firstName} name="firstName" id="" /></td>
                                {errors.firstName ? <span className='text-danger'>{errors.firstName.message}</span> : ""}
                            </tr>
                            <tr>
                                <td>Last Name:</td>
                                <td><input type="text" onChange={changeHandler} value={userInfo.lastName} name="lastName" id="" /></td>
                                {errors.lastName ? <span className='text-danger'>{errors.lastName.message}</span> : ""}
                            </tr>
                            <tr>
                                <td>Username:</td>
                                <td><input type="text" onChange={changeHandler} value={userInfo.userName} name="userName" id="" /></td>
                                {errors.userName ? <span className='text-danger'>{errors.userName.message}</span> : ""}
                            </tr>
                            {/* <tr>
                                <td>Password:</td>
                                <td><input type="text" onChange={changeHandler} name="password" id="" /></td>
                                {errors.userName ? <span className='text-danger'>{errors.userName.message}</span> : ""}
                            </tr>
                            <tr>
                                <td>Confirm Password:</td>
                                <td><input type="text" onChange={changeHandler} name="confirmPassword" id="" /></td>
                            </tr> */}
                            <tr>
                                <td></td>
                                <td><input type="submit" value="Update" className="btn btn-outline-success" /></td>
                            </tr>
                        </tbody>
                    </table>
                </form>

                <form className='form-control mt-5 container' style={{width: 250}} onSubmit={handleDropdownChange}>
                    <label>Additional account types:</label>
                    <table className=''>
                        <tbody>
                            {
                                userInfo.savings == null ?
                                    <tr>
                                        <td>Savings:</td>
                                        <td><select onChange={(e) => setSavings(e.target.value)} name="savings" id="savings">
                                            <option value="null">No</option>
                                            <option value={zero}>Yes</option>
                                        </select></td>
                                    </tr> : <tr></tr>
                            }
                            {
                                userInfo.swiss == null ?
                                    <tr>
                                        <td>Swiss:</td>
                                        <td><select onChange={(e) => setSwiss(e.target.value)} name="swiss" id="swiss">
                                            <option value="null">No</option>
                                            <option value={zero}>Yes</option>
                                        </select></td>
                                    </tr> : <tr></tr>
                            }
                            {
                                userInfo.savings == null || userInfo.swiss == null ?
                                    <tr>
                                        <td></td>
                                        <td><input type="submit" value="Add account" className="btn btn-outline-success" /></td>
                                    </tr> : <tr><td className='text-info'>Maximum accounts opened for this User</td></tr>
                            }
                        </tbody>
                    </table>
                </form>

            </div>
        </div>
    )
}

export default EditUserForm;