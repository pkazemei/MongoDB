import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from "react-router-dom";


const Register = props => {

    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [errors, setErrors] = useState({});
    const [checking, setChecking] = useState(0);
    const [savings] = useState(null);
    const [swiss] = useState(null);

    const history = useHistory();

    const register = e => {
        e.preventDefault();
        const newUser = { firstName, lastName, userName, password, confirm, checking, savings, swiss };
        axios.post("http://localhost:8000/api/register", newUser, { withCredentials: true })
            .then(res => {
                console.log(res)
                if (res.data.errors) {
                    setErrors(res.data.errors);
                }})
            .catch(err => console.log(err));
    }

    return (
        <form onSubmit={register}>
            <p className="form-group">
                <label>First Name:</label>
                <input
                    className="form-control"
                    type="text"
                    name="firstName"
                    onChange={e => setFirstname(e.target.value)}
                    value={firstName}
                />
                {errors.firstName ? <span className='text-danger'>{errors.firstName.message}</span> : ""}
            </p>
            <p className="form-group">
                <label>Last Name:</label>
                <input
                    className="form-control"
                    type="text"
                    name="lastName"
                    onChange={e => setLastname(e.target.value)}
                    value={lastName}
                />
                {errors.lastName ? <span className='text-danger'>{errors.lastName.message}</span> : ""}
            </p>
            <p className="form-group">
                <label>Username:</label>
                <input
                    className="form-control"
                    type="text"
                    name="userName"
                    onChange={e => setUserName(e.target.value)}
                    value={userName}
                />
                {errors.userName ? <span className='text-danger'>{errors.userName.message}</span> : ""}
                {errors.userNameTaken ? <span className='text-danger'>{errors.userNameTaken}</span> : ""}

            </p>
            <p className="form-group">
                <label>Password:</label>
                <input
                    className="form-control"
                    type="password"
                    name="password"
                    onChange={e => setPassword(e.target.value)}
                    value={password}
                />
                {errors.password ? <span className='text-danger'>{errors.password.message}</span> : ""}
            </p>
            <p className="form-group">
                <label>Confirm:</label>
                <input
                    className="form-control"
                    type="password"
                    name="confirm"
                    onChange={e => setConfirm(e.target.value)}
                    value={confirm}
                />
                {errors.confirm ? <span className='text-danger'>{errors.confirm.message}</span> : ""}
            </p>
            <p className="form-group">
                <label>Initial Deposit:</label>
                <input
                    className="form-control"
                    type="number"
                    name="checking"
                    onChange={e => setChecking(e.target.value)}
                    value={checking}
                />
                {errors.checking ? <span className='text-danger'>{errors.checking.message}</span> : ""}
            </p>
            <input type="submit" value="Sign Up" className="btn btn-primary" />
        </form>
    );
}

export default Register;