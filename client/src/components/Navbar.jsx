import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from "react-icons/fa";
import { useAuth } from '../store/userauth';

const Navbar = () => {

    const { isloggedin, LogoutUser } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = [
        { path: "/", title: "Start a search" },
        { path: "/about", title: "About" },
        { path: "/salary", title: "Salary Estimate" },
        { path: "/post-job", title: "Post a job" },
        { path: "/contacts", title: "contact" }
    ];

    const handleMenuToggler = () => {
        setIsMenuOpen(!isMenuOpen);
    }
    const handleMenuToggler2 = () => {
        setIsMenuOpen(!isMenuOpen);
    }


    const handleLogout = () => {
        LogoutUser(); // Assuming LogoutUser is a function that handles logout
        sessionStorage.removeItem("user")
    }

    return (
        <header className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
            <nav className='flex justify-between items-center'>
                <Link to="/" className='flex items-center space-x-2'>
                    <img src='/images/job-portal.png' alt="Logo" width={60} />
                    <h1 className='text-lg font-semibold text-purple-900'>Job Portal</h1>
                </Link>
                <div className='hidden md:flex gap-12'>
                    {navItems.map((item, index) => (
                        <NavLink key={index} to={item.path} className='text-base text-purple-900 active'>
                            {item.title}
                        </NavLink>
                    ))}
                </div>
                <div className='text-base text-blue-700 font-medium space-x-11 hidden lg:block'>
                    {isloggedin ? (
                        <button onClick={handleLogout}>Logout</button>
                    ) : (
                        <>
                            <Link to="/login" className='py-2 px-5 border rounded'>Log in</Link>
                            <Link to="/signup" className='py-2 px-5 border rounded bg-blue-600 text-white'>Sign up</Link>
                        </>
                    )}
                </div>
                <div className='md:hidden'>
                    <button onClick={handleMenuToggler}>
                        {isMenuOpen ? <FaTimes className='w-5 h-5 text-blue-700' /> : <FaBars className='w-5 h-5 text-blue-700' />}
                    </button>
                </div>
            </nav>
            <div className={`px-4 bg-black py-5 rounded-sm ${isMenuOpen ? "" : "hidden"}`}>
                <ul>
                    {navItems.map((item, index) => (
                        <li key={index} className='text-base text-white py-1'>
                            <NavLink to={item.path} className='text-base text-white' onClick={handleMenuToggler}>
                                {item.title}
                            </NavLink>
                        </li>
                    ))}
                    <li className='text-white py-1'>
                        {isloggedin ? (
                            <button onClick={handleLogout}>Logout</button>
                        ) : (
                            <>
                            <Link to="/login" onClick={handleMenuToggler}style={{display:"block"}}>Log in</Link>
                            <Link to="/signup" onClick={handleMenuToggler2}>signup</Link>
                            </>
                        )}
                    </li>
                </ul>
            </div>
        </header>
    );
}

export default Navbar;
