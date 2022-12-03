import React, { useEffect, useState } from "react";
import CurrentUser from "../components/user";
import Axios from "axios"
import ApiLink from "../components/link";


export default function Loans(){

    // const[loanData, setLoanData] = useState({loanData:[]});
    const[userLoan, setUserLoan] = useState(window.localStorage.getItem("userId"));
    // const[userLoan, setUserLoan] = useState({userLoan:[]});
    const[loanee, setLoanee] = useState("");
    // const [rates, setRates] = useState({rates:[]});

    
    // console.log("***********************");
    // console.log(userLoan);
    // const koriDate = joaninahDate.split('T')[0];                     IMPORTANTTTTTTTTTTTTTTTT.
    // console.log("Joanina", koriDate)
    
    useEffect(() =>{
        Axios.post(`${ApiLink}/myloans`,{
            userId:userLoan
        }).then(loaned =>{
            setLoanee(loaned.data[0])
            // console.log(loaned);
            // console.log(loanee)
        }).catch(err =>{
            console.log(err);
        })
    },[])
    



    return(
        <div >
        <CurrentUser />
            <h3>My Loans</h3>
            {/* <input type='search'></input> */}
                        <h4 style={{textDecoration:"underline", margin:"40px"}} >Applied loans</h4>
                        {/* <button onClick={userData}>HEAD</button> */}
            <table className="loans--table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Loan Id</th>
                            <th>Purpose</th>
                            <th>Date of Application</th>
                            <th>Amount(Ksh)</th>
                            <th>interest</th>
                            <th>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total<small><br />(amount + total)</small></th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loanee ? 
                        
                        <tr>
                            <td>{loanee.loanId}</td>
                            <td>{loanee.loanId}</td>
                            <td>{loanee.purpose}</td>
                            <td>{(loanee.createdAt).split('T')[0]}</td>
                            <td>{loanee.amount}</td>
                            <td>{loanee.interest}</td>
                            <td>{loanee.interest + loanee.amount}</td>
                            <td>{loanee.loanStatus}</td>
                            <td className="button--moredetails">
                                {loanee.loanStatus === "Pending Approval" ? 
                                <button 
                                id ="cancel--loan" 
                                className="admin--btn" 
                                onClick={() =>{
                                    Axios.post(`${ApiLink}/cancelloan`,
                                    {
                                        loanid:loanee.loanId
                                    }).then(responsey =>{
                                        console.log(responsey);
                                    }).catch(err =>{
                                        console.log(err);
                                    })
                                }}
                                > Cancel Loan</button> : ""}
                            </td>
                        </tr>
                        : <tr><td>You have no applied loans"</td ></tr>}
                    </tbody>
                </table>
                {/* <fieldset className="pendingloan--field">
                    <legend style={{textDecoration:"underline"}}>Loans Disbursed</legend>
                    <table className="pending--loans"> */}
                    {/* <thead>
                        <tr>
                            <th>#</th>
                            <th>Loan Id</th>
                            <th>Amount(Ksh)</th>
                            <th>Application Date</th>
                            <th>Payment Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>1</td>
                        <td>23</td>
                        <td>12000</td>
                        <td>20-03-2022</td>
                        <td>InProgress</td>
                    </tr>
                    </tbody> */}

                    {/* </table>
                </fieldset>                 */}
            {/* <NavLink to ={"applyloan"}  style={{textDecoration:"none"}} ><h4>Apply Loan</h4></NavLink> */}
        </div>
    )
}