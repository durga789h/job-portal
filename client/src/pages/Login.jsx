import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useAuth } from '../store/userauth';
import { toast } from 'react-toastify';
import './Admin.css'

export default function Login() {
    const LoginButtonText = "Login Now";
   // const[users,setUsers]=useState(sessionStorage)
    const [user, setUser] = useState({
        email: "",
        password: ""
    });
    const navigate = useNavigate();
    const { storeTokenInLS } = useAuth();

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUser({ ...user, [name]: value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user),
            });
            const data = await response.json();
            if (response.ok) {
                sessionStorage.setItem("user", JSON.stringify(user.email));
                storeTokenInLS(data.token); // Store the token in localStorage
                setUser({
                    email: '',
                    password: ''
                });
                toast.success("Login Successful");
                navigate('/');
            } else {
                toast.error(data.message ? data.message : data.msg);
            }
        } catch (error) {
            console.error("login", error);
        }
    }

    return (
        <div className='flex flex-wrap justify-center items-center'>
            <div className='w-full md:w-1/2 p-8'>
                <img 
                src="https://www.factstoday.in/wp-content/uploads/2018/03/VAT-Registration.jpg" 
                alt="registration image" />
            </div>
            <div className='w-full md:w-1/2 p-8'>
                <h1 className='text-2xl font-bold mb-4'>Login Form</h1>
                <form className='space-y-4' onSubmit={handleSubmit}>
                    <div className='flex flex-col'>
                        <label htmlFor="email">Email</label>
                        <input type="email" name='email' id='email' value={user.email} onChange={handleChange} autoComplete='off' required className='border border-gray-300 px-3 py-2 rounded-md' />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="password">Password</label>
                        <input type="password" name='password' id='password' value={user.password} onChange={handleChange} autoComplete='off' required className='border border-gray-300 px-3 py-2 rounded-md' />
                    </div>
                    <Button className="tbutton" buttonText={LoginButtonText} />
                </form>
            </div>
        </div>
    )
}
