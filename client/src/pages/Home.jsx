import React, { useEffect, useState } from 'react';
import Banner from '../components/Banner';

import Jobs from './Jobs';
import Card from '../components/Card';
import Sidebar from '../sidebar/Sidebar';
import Newsletter from '../components/Newsletter';
import { Link } from 'react-router-dom';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:5000/api/job-posts")
      .then(res => res.json())
      .then(data => {
        setJobs(data);
        setIsLoading(false);
      });
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  }

  const filteredItems = jobs.filter((job) => job.jobTitle && job.jobTitle.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1);

  const handleChange = (event) => {
    setSelectedCategory(event.target.value)
  }

  const handleClick = (event) => {
    setSelectedCategory(event.target.value)
  }

  const calculatePageRange = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return { startIndex, endIndex };
  }

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItems.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  }

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const filteredData = (jobs, selected, searchTerm) => {
    let filteredJobs = jobs;

    if (searchTerm) {
      filteredJobs = filteredItems;
    }

    if (selected) {
      filteredJobs = filteredJobs.filter(({ jobLocation, maxPrice, experienceLevel, salaryType, employmentType, postingDate }) => {
        return (
          jobLocation.toLowerCase() === selected.toLowerCase() ||
          parseInt(maxPrice) <= parseInt(selected) ||
          postingDate >= selected ||
          salaryType.toLowerCase() === selected.toLowerCase() ||
          experienceLevel.toLowerCase() === selected.toLowerCase() ||
          employmentType.toLowerCase() === selected.toLowerCase()
        );
      });
    }

    const { startIndex, endIndex } = calculatePageRange();
    filteredJobs = filteredJobs.slice(startIndex, endIndex);

    return filteredJobs.map((data, i) => (
      <div key={i}>
        <Card data={data} />
      </div>
    ));
  }

  const result = filteredData(jobs, selectedCategory, searchTerm);

  console.log(result);

  return (
    <div className='text-violet-700'>
      <Banner query={searchTerm} handleInputChange={handleInputChange}/>
      <div className='bg-[#FAFAFA] md:grid grid-cols-4 gap-8 lg:px-24 px-4 py-12'>
        <div className='bg-white p-4 rounded '><Sidebar handleChange={handleChange} handleClick={handleClick}/></div>
        <div className='col-span-2 bg-white p-4 rounded-sm'>
          {isLoading ? (<p className='font-medium'>Loading ....</p>) : result.length > 0 ? (<Jobs result={result}/>) : <>
            <h3 className='text-lg-font-bold mb-2'>{result.length} jobs</h3>
            <p>No Data found</p>
          </>}
          {result.length > 0 ? (
            <div className='flex justify-center mt-4 space-x-8'>
              <button onClick={prevPage} disabled={currentPage === 1} className='hover:underline'>Previous</button>
              <span className='mx-2'>Page {currentPage} of {Math.ceil(filteredItems.length / itemsPerPage)}</span>
              <button onClick={nextPage} disabled={currentPage === Math.ceil(filteredItems.length / itemsPerPage)} className='hover:underline'>Next</button>
            </div>
          ) : ""}
        </div>
        
        <div className='bg-white p-4 rounded '><Newsletter/></div>
      </div>
    </div>
  );
}
