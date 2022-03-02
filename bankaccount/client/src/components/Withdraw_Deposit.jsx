import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from 'axios';
import { Link } from 'react-router-dom';

const Withdraw_Deposit = () => {
    let [userdet, setuserdet] = useState({});
    let [accountType, setAccountType] = useState('checking');
    let [w_d, setw_d] = useState('');
    let [amount, setAmount] = useState(0);
    const history = useHistory();

    useEffect(() => {
        axios.get("http://localhost:8000/api/getloggedinuser", { withCredentials: true })
            .then(res => {
                console.log("res ", res)
                setuserdet(res.data.results)
            })
            .catch(err => {
                console.log("err", err)
                history.push("/")
            })
    }, [])

    const handletransaction = (e) => {
        e.preventDefault();
        const usercopy = {...userdet }
        if (w_d === 'withdraw') {
            Object.keys(usercopy).map((key, i) => {
                //console.log( i, key)
                if( key === accountType && key ){
                    console.log(key)
                    let balance = usercopy[key] - amount;
                    console.log('balance', balance)
                    usercopy[key] = balance
                }
            })
        }
        else {
            Object.keys(usercopy).map((key, i) => {
                //console.log( i, key)
                if( key === accountType && key ){
                    console.log(key)
                    let balance = +usercopy[key] + +amount;
                    console.log('balance', balance)
                    usercopy[key] = balance
                }
            })
            // let balance = +userdet.checking + +amount;
            // console.log('Details with new balance -->', balance)
            // usercopy.checking = balance
        }

        axios.put(`http://localhost:8000/api/users/edit`, usercopy, { withCredentials: true })
            .then(res => {
                console.log("res after put request-->", res)
                history.push(`/home`)
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <h3>Withdraw/Deposit</h3>
            <p>({userdet._id})</p>
            <form className="form-control container" style={{ width: 400 }} onSubmit={handletransaction}>
                <table>
                    <tbody>
                        <tr>
                            <th>Curr.Balance:</th>
                            {
                                accountType === 'checking' ?
                                    <td>${userdet.checking}</td> : ''
                            }
                            {
                                accountType === 'savings' && userdet.savings != null ?
                                    <td>${userdet.savings}</td> : ''
                            }
                            {
                                accountType === 'swiss' && userdet.swiss != null ?
                                    <td>${userdet.swiss}</td> : ''
                            }
                        </tr>
                        <tr>
                            <th>Account type:</th>
                            <td className="p-2">
                                <select onChange={(e) => setAccountType(e.target.value)} name="accountType">
                                    <option value="checking">Checking</option>
                                    <option value="savings">Savings</option>
                                    <option value="swiss">Swiss</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th></th>
                            <td className="d-flex">
                                <p className=" ms-3 me-2 mt-2 mb-0">Withdraw <input onChange={(e) => setw_d(e.target.value)} type="checkbox" value='withdraw' name="withdraw" id="" /></p>
                                <p className="mt-2 mb-0">Deposit <input onChange={(e) => setw_d(e.target.value)} type="checkbox" value='deposit' name="deposit" id="" /></p>
                            </td>
                        </tr>
                        <tr>
                            <th>Amount:</th>
                            <td><input type="number" onChange={(e) => setAmount(e.target.value)} name="" id="" /></td>
                        </tr>
                        <tr>
                            <td><Link className="btn btn-sm btn-warning" to={`/home`}>Cancel</Link></td>
                            <td><input className="btn btn-sm btn-info" type="submit" value='Make Transaction' /></td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </div>
    )
}

export default Withdraw_Deposit;