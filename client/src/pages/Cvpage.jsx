import React, { useState } from 'react';
import { useAuth } from '../store/userauth';
import { toast } from 'react-toastify';
import Joinnow from '../components/Joinnow'; // Import the Joinnow component
import { useNavigate } from 'react-router-dom';

const Cvpage = () => {
  const { createCvData } = useAuth();
  const [uploadMessage, setUploadMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [file, setFile] = useState(null);
  const [cvUploaded, setCvUploaded] = useState(false); // State to track if CV is uploaded

  const navigate = useNavigate(); // Use useNavigate hook for navigation

  const handleUpload = async () => {
    try {
      // Validation checks
      if (!name) {
        toast.error("Name is required");
        return;
      }
      if (!email) {
        toast.error("Email is required");
        return;
      }
      if (!phone) {
        toast.error("Phone number is required");
        return;
      }
      if (phone.length !== 10 || isNaN(phone)) {
        toast.error("Phone number must be exactly 10 digits");
        return;
      }
      if (!address) {
        toast.error("Address is required");
        return;
      }
      if (!file) {
        toast.error("CV file is required");
        return;
      }

      const formData = new FormData();
      formData.append('name', name);
      formData.append('address', address);
      formData.append('cv', file);
      formData.append("email", email);
      formData.append("phone", phone);

      await createCvData(formData);
      setUploadMessage('Upload CV successful');
      console.log(formData);
      toast.success("CV is uploaded successfully");
      setCvUploaded(true); // Set cvUploaded to true after successful upload

      // Clearing the data after successful upload
      setName('');
      setAddress('');
      setFile(null);
      setEmail("");
      setPhone("");
      navigate("/joinnow"); // Navigate to Joinnow page
    } catch (error) {
      console.error(error.message);
      toast.error("Upload is not successful");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <div className="w-full text-center max-w-md p-4 bg-white rounded-lg shadow-lg">
        {uploadMessage && <p className="text-green-500 mb-4">{uploadMessage}</p>}
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMjOdcR9I3XdNWCbAJw3Ch9aWQMl5x39a-iw&s"
          alt="CV Example"
          className="mt-8 w-40"
        />
        <h2 className="text-2xl font-semibold mb-4">Upload Your CV</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <input
          type="email"
          placeholder="email@gmail.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full px-4 py-2 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          accept=".pdf"
          className="mb-4"
        />
        <button
          onClick={handleUpload}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Upload CV
        </button>
        {/* Pass cvUploaded state to Joinnow component */}
        {/*<Joinnow cvUploaded={cvUploaded} />*/}
      </div>
    </div>
  );
};

export default Cvpage;
