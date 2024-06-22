import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const jobPortalImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYLQy-jXVxgZrpeGAEMVagQbLvQ2fTsFoG1kUcb8j_mQ&s";

const Joinnow = ({ cvUploaded }) => {
  const [registrationId, setRegistrationId] = useState(null);

  const generateRegistrationId = () => {
    // Generate a random registration ID (you can use a library like uuid for more reliable IDs)
    const id = Math.floor(Math.random() * 1000000);
    return id;
  };

  /*const handleClick = () => {
    if (cvUploaded) {
      const id = generateRegistrationId();
      setRegistrationId(id);
      toast.success(`You have successfully joined the job post! Your registration ID is: ${id}`);
    } else {
      toast.error("Please fill out the CV page form first.");
    }
  };*/

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center lg:gap-20 lg:mx-auto lg:max-w-6xl">
      <div className="text-center lg:text-left lg:w-1/2">
        <div>
          <h1 className="text-3xl lg:text-5xl font-bold mb-4 text-blue-400">Thanks for contacting us on my website</h1>
        </div>
        <div >
         
          <p className="text-lg mb-4 text-cyan-700">Your interview round is on next week, so stay in touch with us.</p>
          <p className="text-lg mb-4 text-cyan-700">We will contact you, after the interview round.</p>
          <p className="text-lg mb-4 text-cyan-700">Be prepared for your interview.</p>
          <p className="text-lg mb-4 text-cyan-700">We will send the required details to your registered email further.</p>
         
         {/* <button className='bg-blue-800 text-white p-3 rounded-sm' onClick={handleClick}>Join Now</button>*/}
        <p>for any query you can mail me on this email address</p>  <a href="mailto:abc@gmail.com" className='text-red-700 underline'>yourgmail@gmail.com</a>

        </div>
      </div>
      <div className="lg:w-1/2">
        <img src={jobPortalImage} alt="Job Portal" className="w-full rounded-lg" />
      </div>
      <button className='bg-blue-800 text-white rounded p-3'><Link to={"/"}>Move Back to Home</Link></button>
    </div>
  );
}

export default Joinnow;
