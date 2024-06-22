import React, { useState } from 'react';
import Button from '../components/Button';
import {toast} from 'react-toastify';

export default function Contact() {
  const defaultContactFormData = {
    username: '',
    email: '',
    phone: '',
    message: ''
  };

  const contactButtonText = "Contact Now";

  const [cuser, setCUser] = useState(defaultContactFormData);

  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setCUser({ ...cuser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/form/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(cuser),
      });

      if (response.ok) {
        setCUser(defaultContactFormData);
        const data = await response.json();
        console.log(data);
        toast.success("Message sent successfully");
      } else {
        console.error("API Error:", response.status, response.statusText);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='flex flex-wrap justify-center items-center'>
      <div className='w-full md:w-1/2 p-8'>
        <h1 className='text-2xl font-bold mb-4'>Contact Page</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <input type="text" name='username' value={cuser.username} onChange={handleChange} placeholder='Name' className='border border-gray-300 px-3 py-2 rounded-md mb-3 w-full' />
            <input type="email" name='email' value={cuser.email} onChange={handleChange} placeholder='Email' className='border border-gray-300 px-3 py-2 rounded-md mb-3 w-full' />
            <input type="text" name='phone' value={cuser.phone} onChange={handleChange} placeholder='Phone' className='border border-gray-300 px-3 py-2 rounded-md mb-3 w-full' />
            <textarea name="message" value={cuser.message} onChange={handleChange} placeholder='Message' className='border border-gray-300 px-3 py-2 rounded-md mb-3 w-full'></textarea>
            <Button buttonText={contactButtonText} onClick={handleSubmit} />
          </form>
        </div>
      </div>
      <div className='w-full md:w-1/2 p-8'>
        <img src="https://thumbs.dreamstime.com/b/social-media-stay-connected-concept-people-using-81499037.jpg" alt="contact image" className='max-w-full h-auto' />
      </div>
    </div>
  );
}
