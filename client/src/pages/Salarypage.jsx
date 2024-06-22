import React, { useEffect, useState } from 'react';
import PageHeader from '../components/PageHeader';
import { Link } from 'react-router-dom';

export default function Salarypage() {
  const [searchText, setSearchText] = useState("");
  const [originalSalary, setOriginalSalary] = useState([]);
  const [filteredSalary, setFilteredSalary] = useState([]);

  useEffect(() => {
    fetch("salary.json")
      .then(res => res.json())
      .then(data => {
        setOriginalSalary(data);
        setFilteredSalary(data); // Initially, set filteredSalary to all salary data
      });
  }, []);

  const handleSearch = () => {
    const filteredData = originalSalary.filter(
      job => job.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredSalary(filteredData);
  };

  const handleReset = () => {
    setFilteredSalary(originalSalary);
    setSearchText("");
  };

  // Function to split array into chunks of size n
  const chunkArray = (array, size) => {
    const chunkedArr = [];
    for (let i = 0; i < array.length; i += 2) {
      chunkedArr.push(array.slice(i, i + 2));
    }
    return chunkedArr;
  };

  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
      <PageHeader title={"Estimate Salary"} path={"Salary"} />
      <div className='mt-5'>
        <div className='search-box p-2 text-center mb-2'>
          <input
            type="text"
            name='search'
            id='search'
            className='py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)} />
          <button className='bg-blue-800 text-white font-semibold px-8 py-2 rounded-sm mb-4 mr-3' onClick={handleReset}>Reset</button>
          <button className='bg-blue-800 text-white font-semibold px-8 py-2 rounded-sm mb-4' onClick={handleSearch}>Search</button>
        </div>
      </div>
      {/*salary dispatch*/}
      <div className='grid lg-grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-12 my-12 items-center'>
        {chunkArray(filteredSalary, 3).map((chunk, index) => (
          <div key={index} className="flex gap-4">
            {chunk.map((data) => (
              <div key={data.id} className='shadow px-4 py-8'>
                <h4 className='font-semibold text-xl'>{data.title}</h4>
                <p className='my-2 font-medium text-blue-800 text-lg'>{data.salary}</p>
                <div className='flex flex-wrap gap-4'>
                  <Link to={"/"} className="underline">{data.status}</Link>
                  <Link to={"/"} className="underline">{data.skills}</Link>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
