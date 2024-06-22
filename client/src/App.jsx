import React from "react";
import { Routes, Route } from "react-router-dom";
import './App.css';

import Home from "./pages/Home";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import CreateJob from "./pages/CreateJob";
import  Contact from './pages/Contact';
import  AdminContacts  from "./pages/Admincontact";
import  AdminUpdate  from "./pages/AdminUpdate";
import  AdminUsers  from "./pages/AdminUser";
import AdminLayout from "./Layouts/AdminLayout";
import ErrorPage from './pages/ErrorPage';
import AdminMyJobs from "./pages/AdminMyJobs";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AdminPostupdate from "./pages/AdminPostupdate";
import Salarypage from "./pages/Salarypage";
import Cvpage from "./pages/Cvpage";
import Joinnow from "./components/Joinnow";



const App = () => (
    <>
        <Navbar /> {/* Navbar outside the Routes */}
        <Routes>
        
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/post-job" element={<CreateJob/>}/>
            <Route path='contacts' element={<Contact />} />
            <Route path='/salary' element={<Salarypage/>} />
           
            <Route path='signup' element={<Signup />} />
            <Route path='login' element={<Login />} />
            <Route path='cvpage' element={<Cvpage />} />
            <Route path='joinnow' element={<Joinnow />} />
            <Route path='*' element={<ErrorPage />} />

                   
        <Route path='/admin'>
            <Route path='/admin' element={<AdminLayout />} />
            <Route path='users' element={<AdminUsers />} />
            <Route path='contacts' element={<AdminContacts />} />
            <Route path='my-job' element={<AdminMyJobs />} />
            <Route path='my-job/post-update/:id' element={<AdminPostupdate/>}/>
            <Route path='users/:id/edit' element={<AdminUpdate/>}/>

          </Route>
          </Routes>
    </>
);

export default App;
