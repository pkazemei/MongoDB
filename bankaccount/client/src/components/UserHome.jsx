import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios'

const Dashboard = () => {
    const history = useHistory();
    const [ id, setID ] = useState('');
    const [user, setUser] = useState({})

    useEffect(()=>{
        axios.get("http://localhost:8000/api/getloggedinuser", {withCredentials:true})
            .then(res=>{
                console.log("res ", res)
                setUser(res.data.results)
                setID(res.data.results._id)
            })
            .catch(err=>{
                console.log("err", err)
                history.push("/")
            })
    },[])

    const logout = ()=>{
        axios.get("http://localhost:8000/api/logout", {withCredentials:true})
            .then(res=>{
                console.log("res logging out", res)
            })
            .catch(err=>console.log("err logging out", err))
            history.push("/")
    }
    return (
        <div className='container form-group'>
            <h3>Welcome {user.userName}</h3>
            <Link className='btn btn-sm btn-info' to={`/users/edit`}>Account settings</Link>
            <Link className='ms-4 me-4'>Transfer</Link>
            <Link className='btn btn-sm btn-dark' to={`/users/w_d`}>Withdraw/Deposit</Link>
            <button onClick={logout} className='btn btn-sm btn-danger ms-4'>Log Out</button>

            <table className='table container' style={{width: 500}}>
                <thead className=''><tr><th>Account(s)</th>
                    <th className=''>Balance</th></tr></thead>
                <tbody>
                    <tr>
                        <td>Checkings:</td>
                        <td>${user.checking}</td>
                    </tr>
                    { user.savings != null ? 
                    <tr>
                        <td>Savings:</td>
                        <td>${user.savings}</td>
                    </tr> : <tr></tr>}
                    { user.swiss != null ? 
                    <tr>
                        <td>Swiss:</td>
                        <td>${user.swiss}</td>
                    </tr> : <tr></tr>}
                </tbody>
            </table>
            
        </div>
    );
};

export default Dashboard;