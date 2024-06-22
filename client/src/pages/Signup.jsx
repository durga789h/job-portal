import React, { useState } from 'react';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/userauth';
import { toast } from 'react-toastify';
import './Admin.css'

export default function Signup() {
    const homeButtonText = "Sign Up Now";
    const [user, setUser] = useState({
        username: '',
        email: '',
        phone: '',
        password: ''
    });
    const navigate = useNavigate();
    const handleRegister = async () => {
      // console.log("Register successful");
        setUser({
            username: '',
            email: '',
            phone: '',
            password: ''
        });
        toast.success("registration_sucessful");
        navigate('/login');
    }
    const { storeTokenInLS } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user),
            });
            const data = await response.json(); //data from server if(user)
            console.log("server info", data);

            if (response.ok) {
                // Handle successful registration here
                storeTokenInLS(data.json);
                //localStorage.setItem("token",data.token)
                handleRegister();
            } else {
                // Handle registration failure
                console.error('Registration failed:', response.statusText);
                toast.error(data.message ? data.message : data.msg);
            }
        } catch (error) {
            console.error("signup error", error);
        }
    }

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({ ...user, [name]: value });
    }

    return (
        <div className='flex flex-wrap justify-center items-center'>
            <div className='w-full md:w-1/2 p-8'>
                <img src="https://www.factstoday.in/wp-content/uploads/2018/03/VAT-Registration.jpg" alt="registration image" />
            </div>
            <div className='w-full md:w-1/2 p-8'>
                <h1 className='text-2xl font-bold mb-4'>Registration Form</h1>
                <form className='labels' onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                    <input type="text" name='username' id='username' value={user.username} onChange={handleChange} className='mb-2 px-4 py-2 border border-gray-300 rounded-md w-full' />
                    <label htmlFor="email">Email</label>
                    <input type="email" name='email' id='email' value={user.email} onChange={handleChange} className='mb-2 px-4 py-2 border border-gray-300 rounded-md w-full' />
                    <label htmlFor="phone">Phone</label>
                    <input type="text" name='phone' id='phone' value={user.phone} onChange={handleChange} className='mb-2 px-4 py-2 border border-gray-300 rounded-md w-full' />
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' id='password' value={user.password} onChange={handleChange} className='mb-2 px-4 py-2 border border-gray-300 rounded-md w-full' />
                    <button type="submit" className='mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'>{homeButtonText}</button>
                </form>
            </div>
        </div>
    )
}
