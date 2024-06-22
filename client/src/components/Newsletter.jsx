import React, { useState } from 'react';
import { FaEnvelopeOpenText, FaRocket } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import {toast} from 'react-toastify';
import { useAuth } from '../store/userauth';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
    const { isloggedin } = useAuth(); 
  const handleSubscribe = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name }),
      });
      
      if (response.ok) {
        const data=await response.json();
        console.log(data);
        toast.success('Subscription successful!');
        setEmail("");
        setName("");

      } else {
        toast.error('Subscription failed. Please try again later.');
      }
    } catch (error) {
      console.error('Error subscribing:', error);
      toast.error('Subscription failed. Please try again later.');
    }
  };

  if (!isloggedin) {
    return <div>You must be logged in to access this page</div>;
  }

  return (
    <div>
      <div>
        <h3 className='text-lg font-bold mb-2 flex items-center gap-2'>
          <FaEnvelopeOpenText />
          Email me for jobs
        </h3>
        <p className='text-primary/75 text-base mb-4'>Ut ease eiusmod aute.sit enim labore dolore.Aute ea fugiat commodo ea foes.</p>
        <div className='w-full space-y-4'>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='name@mail.com' className='w-full block py-2 pl-3 border focus:outline-none' />
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='Your Name' className='w-full block py-2 pl-3 border focus:outline-none' />
          <input type="submit" onClick={handleSubscribe} value={"subscribe"} className='w-full block py-2 pl-3 border focus:outline-none bg-blue-700 rounded-sm text-white cursor-pointer font-semibold' />
        </div>
      </div>

      <div className='mt-20'>
        <h3 className='text-lg font-bold mb-2 flex items-center gap-2'>
          <FaRocket />
          Get noticed faster
        </h3>
        <p className='text-primary/75 text-base mb-4'>Ut ease eiusmod aute.sit enim labore dolore.Aute ea fugiat commodo ea foes.</p>
        <div className='w-full space-y-4'>
          <Link to="/cvpage">
            <input type="submit" name="" value={"upload your resume"} className='w-full block py-2 pl-3 border focus:outline-none bg-blue-700 rounded-sm text-white cursor-pointer font-semibold' />
          </Link>
        </div>
      </div>
    </div>
  );
}
