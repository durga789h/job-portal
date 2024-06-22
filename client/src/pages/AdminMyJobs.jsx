import React, { useState, useEffect } from 'react';
import './Admin.css'

import { Link, useNavigate } from 'react-router-dom';
import {useAuth} from '../store/userauth';


export default function AdminMyJobs() {
  const router=useNavigate();
const {authorizationToken}=useAuth();

  const [jobs, setJobs] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");


  useEffect(() => {
    fetchJobPosts();
  }, []);

  const fetchJobPosts = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/admin/job-posts",{

      method:'GET',
      headers:{
        Authorization:authorizationToken,
    
      }
    });
      if (response.ok) {
        const data = await response.json();
        setJobs(data);
        console.log(data)
      } else {
        throw new Error('Failed to fetch job posts');
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

 const handleSearch = async () => {
   const filter=jobs.filter(
    (job)=>
    job.jobTitle.toLowerCase().indexOf(searchText.toLowerCase()) !==-1
   )
   setJobs(filter);
   setIsLoading(false);
  }; 

  const handleDelete = async (id) => {
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5000/api/admin/job-posts/${id}`, {
        method: 'DELETE',
          headers: {
        Authorization: authorizationToken,
      },
      });
      if (response.ok) {
        // Refresh job posts after deletion
        fetchJobPosts();
        setSuccessMessage("Job post deleted successfully");
      } else {
        throw new Error('Failed to delete job post');
      }
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  const bod34={
    Boader:"2px solid black"
  }

  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
      <div className='my-jobs-container'>
        <h1 className='text-center p-4'>All My Jobs</h1>
        <div className='search-box flex justify-center mb-2'>
          <input 
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            name='search'
            className='py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full'
          />
          <button
            className='bg-blue-800 text-white font-semibold px-8 py-2 rounded-sm ml-2'
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        {/* Error and success messages */}
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4" role="alert">
            {errorMessage}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4" role="alert">
            {successMessage}
          </div>
        )}
        {/* Job list table */}
        <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4 mt-5'>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 border-b-violet-800" style={bod34}>
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr >
                <th>Job Title</th>
                <th>Company Name</th>
                <th>Salary</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs.slice(0, 8).map(job => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-t-cyan-400" key={job._id}>
                  <td>{job.jobTitle}</td>
                  <td>{job.companyName}</td>
                  <td>{job. maxPrice}</td>

                  <td className='flex flex-col' >
                  <Link to={`post-update/${job._id}`}> <button 
                      className='bg-green-600 text-white font-semibold px-4 py-1 rounded-sm mr-0 md:mr-0 md:mb-2 down45'
                      
                    >
                      Edit
                    </button></Link>
                   
                    <button 
                      className='bg-red-600 text-white font-semibold px-4 py-1 rounded-sm md:mb-2'
                      onClick={() => handleDelete(job._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <button className='bg-blue-700 text-white p-3 rounded-full w-full mt-2 mb-3'  onClick={()=>router("/admin")}>previous</button>
    </div>
  );
}
