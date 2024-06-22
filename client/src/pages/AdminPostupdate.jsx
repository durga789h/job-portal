import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from "../store/userauth";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
const AdminPostupdate = () => {
  const router=useNavigate();
    const {authorizationToken}=useAuth();
    const navigate=useNavigate();
  const { id } = useParams();
  const [jobPost, setJobPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    minPrice: "",
    maxPrice: "",
    salaryType: "",
    jobLocation: "",
    postingDate: "",
    experienceLevel: "",
    requiredSkills: [],
    companyLogo: "",
    employmentType: "",
    description: "",
    postedBy: ""
  });

  useEffect(() => {
    fetchJobPost();
  }, []);

  const fetchJobPost = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/job-posts`,{
        method: "GET",
      headers: {
        Authorization: authorizationToken,
      },
      });
      if (response.ok) {
        const data = await response.json();
        setJobPost(data);
        setFormData(data); // Set the form data with fetched job post data
      } else {
        throw new Error('Failed to fetch job post');
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/admin/job-posts/${id}`, {
        method: "PUT",
        headers: {
            'Content-Type':'application/json',
          Authorization: authorizationToken,
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        setJobPost(data);
        setFormData(data); // Set the form data with fetched job post data
     toast.success("edit post data successfull")
      navigate("/admin/my-job");
    
      }
      else {
      
        toast.error('Failed to update job post');
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }

  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
      <div className=' py-10 px-4 lg:px-16'>
        <form onSubmit={handleSubmit} className=' bg-blue-800 space-y-5'>
          {/* Render input fields with pre-filled values */}
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            className='create-job-input text-black border'
            placeholder='job Title'
          />

          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className='create-job-input border'
            placeholder='companyName'
          />

            <input
            type="text"
            name="maxPrice"
            value={formData.maxPrice}
            onChange={handleChange}
            className='create-job-input border'
            placeholder='maxPrice'
          />   
          {/* Repeat this for other input fields */}
          
          <input type="submit" className='block mt-12 bg-blue-800 text-white font-semibold px-8 py-2 rounded-sm cursor-pointer'/>
        </form>
      </div>
      <button className='bg-blue-700 text-white p-3 rounded-full'  onClick={()=>router("/admin")}>previous</button>
    </div>
  );
};

export default AdminPostupdate;
