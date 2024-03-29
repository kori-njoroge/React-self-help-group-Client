import React from 'react';
import { BrowserRouter, Routes,Route} from 'react-router-dom';

import './App.css';


//importing pages
import Home from './pages/Home';
import Signin from './pages/signin';
import Aboutus from './pages/Aboutus';
import Signup from './pages/signup';
import ContactUs from './pages/Contactus';
import UserDashboard from './components/userdashboard';
import ErrorPage from './pages/errorPage';
import Dashboard from './pages/dashboard';
import MyWallet from './pages/mywallet';
import Loans from './pages/loans';
import ApplyLoan from './pages/applyloan';
import Members from './pages/members';
import Admin from './pages/Admin/admin';
import AdminMembers from './pages/Admin/Admincomponents/adminMembers';
import AppliedLoans from './pages/Admin/Admincomponents/AdminApplied';
import ApprovedLoans from './pages/Admin/Admincomponents/ApprovedAdmin';
import AdminSaving from './pages/Admin/Admincomponents/adminSavings';
import Evaluation from './pages/Admin/Admincomponents/evaluation';
import MoreDetails from './pages/Admin/Admincomponents/moredetails';
import GroupAccounts from './pages/Admin/Admincomponents/groupaccounts';
import Register from './pages/register';
import Messages from './pages/Admin/Admincomponents/sentmessages';


function App() {
  const loggedIn = window.localStorage.getItem("isLoggedIn");
  console.log(loggedIn,"login");
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element ={loggedIn ? <UserDashboard/> :<Home />}/>
          <Route path='admin' element ={<Admin />} > 
          <Route path='adminmembers' element={<AdminMembers />}>
          <Route path='moredetails' element={<MoreDetails />}/>
          </Route>
          <Route path='appliedloans' element={<AppliedLoans />}>
          <Route path='evaluation' element ={<Evaluation />}/>
          </Route>
          <Route path='approvedloans' element ={<ApprovedLoans />}/>
          <Route path='groupaccounts' element = {<GroupAccounts />}/>
          <Route path='sentmessages' element = {<Messages />}/>
          <Route path='adminsavings' element ={<AdminSaving />}/>
          </Route>
          <Route path='/signup' element ={<Signup/>}/>
          <Route path='/aboutus' element ={<Aboutus/>}/>
          <Route path='/contactus' element ={<ContactUs/>}/>
          <Route path='/register' element={<Register />}/>
          {/* <Route path='/settings' element={<Settings />} /> */}
          <Route path='signin' element ={<Signin/>}/>
          <Route path='/dashboard' element ={<UserDashboard />}>
            <Route path='summary' element ={<Dashboard />}/> 
            <Route path='mywallet' element={<MyWallet/>}/>
            {/*  */}
            <Route path='register' element={<Register />}/>
            {/*  */}
            <Route path='applyloan' element={<ApplyLoan />}/>
            <Route path='myloans' element={<Loans />} >
            <Route path='applyloan' element={<ApplyLoan />}/>
            </Route>
            <Route path='members' element={<Members />} />
          </Route>
          <Route path='*' element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
