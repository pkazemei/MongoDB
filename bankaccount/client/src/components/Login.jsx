import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const Login = props => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const history = useHistory();

    const login = e => {
        e.preventDefault();
        let login = { userName, password}
        axios.post("http://localhost:8000/api/login", login, {withCredentials: true} )
            .then(res => {
                console.log('res from login', res);
                if (res.data.msg !== "success!") {
                    setErrorMessage(res.data.msg);
                } else {
                    history.push("/home")
                }
            })
            .catch(err => console.log(err));
    }

    return (
        <form onSubmit={login}>
            <p className="form-group">
                <label>Username:</label>
                <input
                    className="form-control"
                    type="userName"
                    name="userName"
                    onChange={e => setUserName(e.target.value)}
                    value={userName}
                />
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
            </p>
            <input type="submit" value="Sign In" className="btn btn-primary" />
            <p className="error-message">{errorMessage ? errorMessage : ""}</p>
        </form>
    );
}

export default Login;