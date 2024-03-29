import React, { useEffect, useState } from "react";
import Axios  from "axios";
// import New from "./new";
import { NavLink } from "react-router-dom";
import MoreDetails from "./moredetails";
import Link from "../../../components/link";
import html2canvas from 'html2canvas';
import { jsPDF } from "jspdf";
import { PDFExport} from '@progress/kendo-react-pdf'



export default function Adminmembers(){

    const[members, setMembers] = useState("");
    const[more, setMore] = useState(false);
    const[search,setSearch] = useState('')

    // TO MORE DETAILS PROPS
    const[userDetails, setUserDetails]= useState(null)
    const[savingsdetails, setSavingsDetails]= useState(null)
    const[loandetails, setLoanDetails]= useState(null)
    const[savingsTotal, setsavingsTotal]= useState(null)

    const pdfExport =React.useRef(null)

    function saveCanvasAsPDF(){
        pdfExport.current.save();
    }


    useEffect(() =>{
        Axios.post(`${Link}/admin/adminMembers`).then(members =>{
            // console.log(members);
            setMembers(members.data[0].User)
            window.localStorage.setItem("allUsers",JSON.stringify(members.data));
        })
    },[])
    
    // function savePdf() {
    //         let DATA  = document.getElementById('report');
    //         html2canvas(DATA).then((canvas) => {
    //         let fileWidth = 208;
    //         let fileHeight = (canvas.height * fileWidth) / canvas.width;
    //         const FILEURI = canvas.toDataURL('image/*');
    //         let PDF = new jsPDF('p', 'mm', 'a4');
    //         let position = 0;
    //         PDF.addImage(FILEURI, 'image/*', 0, position, fileWidth, fileHeight);
    //         PDF.save('report.pdf');
    //         });
        
        
    //     }

    // function generatePDF(){
    //     const element = document.getElementById('report');
    //     const doc = new jsPDF({
    //         orientation: 'landscape',
    //         unit: 'in',
    //         format: [4, 2],
    //     });
    //     doc.html(element, {
    //         async callback(doc) {
    //             await doc.save('pdf_name');
    //         },
    //     });

    // }

    console.log(search)

    return(
        <div >
            <h3>Members</h3>
            {/* <canvas id='my-canvas' /> */}
            <form>
                <input 
                className="search--members" 
                type="text" 
                onChange={(event) =>{
                    setSearch(event.target.value)
                }}
                placeholder="search members"
                />&nbsp;&nbsp;&nbsp;&nbsp;
                <button style={{displa: 'none'}} id="hideElement" onClick={saveCanvasAsPDF}>Download List</button>     
            </form>
            <PDFExport ref={pdfExport}>
            <table className="admin--members--table">
                    <thead>
                        <tr>
                            <th>UserId</th>
                            <th className="admin--table--head">First Name</th>
                            <th className="admin--table--head">Last Name</th>
                            <th className="admin--table--head">Phone Number</th>
                            <th className="admin--table--head">IDnumber</th>
                            <th className="admin--email">Email</th>
                            <th className="admin--table--dte">Joining Date</th>
                            <th >Status</th>
                            {/* <th className="button--moredetails"></th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {members?
                        members.filter((member) =>{
                            return search.toLowerCase() === ''? member :member.firstname.toLowerCase().includes(search)
                        }).map(member =>(
                            (member.firstname === "Admin" ?  "":
                        <tr key={member.userId}>
                            <td>{member.userId}</td>
                            <td>{member.firstname}</td>
                            <td>{member.lastname}</td>
                            <td>0{member.phonenumber}</td>
                            <td>{member.IDnumber}</td>
                            <td>{member.email}</td>
                            <td>{(member.createdAt).split('T')[0]}</td>
                            <td>{member.accountStatus}</td>
                            <td className="button--moredetails"><NavLink to={'moredetails'}><button 
                            onClick={() =>{
                                setMore(true);
                                Axios.post(`${Link}/admin/adminMembers/moredetails`,{
                                    userid:member.userId
                                }).then(response =>{
                                    console.log("response",response.data[0].User[0])
                                    setUserDetails(response.data[0].User)
                                    setSavingsDetails(response.data[1].Savings)
                                    setLoanDetails(response.data[2].loans)
                                    if(response.data[3].total[0].total){
                                        setsavingsTotal(response.data[3].total[0].total)
                                    }else{
                                        setsavingsTotal(0);
                                    }
                                })
                            }} 
                            className="admin--btn"
                            >More Details</button></NavLink></td>
                            {/* <td cla.split('T')[0]ssName="button--moredetails"><button onClick={Guesswho} className="admin--btn">More<i className="fa fa-chevron-right" id="more--info--icon"></i> <i className="fa fa-chevron-right" id="more--info--icon"></i>Details</button></td> */}
                        </tr>
                    )
                    ))
                    : ""}
                    </tbody>
                </table>
                </PDFExport> 
                

                {more ? 
                <MoreDetails  
                    userId ={userDetails? userDetails[0].userId : 0}
                    username ={userDetails? userDetails[0].firstname : ''}
                    accountStatus ={userDetails? userDetails[0].accountStatus : ''}
                    userdetails={userDetails}
                    savingsdetails={savingsdetails}
                    loandetails={loandetails}
                    savingsTotal={savingsTotal}
                /> 
                : null}
        </div>
    )
}