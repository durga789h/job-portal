import React,{useState} from 'react';
import { useForm } from "react-hook-form";
import CreatableSelect from 'react-select/creatable'
import { toast } from 'react-toastify';
import { useAuth } from '../store/userauth';

export default function CreateJob() {
  const [selectedOption,setSelectedOption]=useState(null);
  const { isloggedin } = useAuth(); 
    const {
        register,
        handleSubmit,
         reset,
        // watch,
        formState: { errors },
      } = useForm()
    
      const onSubmit = (data) =>{
       
  try {
    fetch("http://localhost:5000/api/job-posts",{
      method:"POST",
      headers:{"content-type":"application/json"},
      body:JSON.stringify(data)
    })
   .then((res)=>res.json())
   .then((result)=>{
    console.log(result);
    if(result.acknowledged === true){
    
    }
    reset()
    toast.success("data-post successfull");
    
   })

    }
   catch (error) {
    console.log(error)
    toast.error("data is not post correctly please check details");
  }
       
        console.log(data)
      };
      const options=[
        {value:"JavaScript", label:"JavaScript"},
        {value:"C++", label:"C++"},
        {value:"HTML", label:"HTML"},
        {value:"CSS", label:"CSS"},
        {value:"React", label:"React"},
        {value:"Node", label:"Node"},
        {value:"MongoDB", label:"MongoDB"},
        {value:"Redux", label:"Redux"},
        
      ]

      if (!isloggedin) {
        return <div>You must be logged in to access this page</div>;
      }
    
     // console.log(watch("example")) // watch input value by passing the name of it
  return (
    <div className='max-w-screen-2xl container mx-auto xl:px-24 px-4'>
      <div className='bg-[#FAFAFA] py-10 px-4 lg:px-16'>

      <form onSubmit={handleSubmit(onSubmit)} className='space-y-5'>
              {/* 1st row */}
        <div className='flex flex-col lg:flex-row items-center justify-between gap-8'>
          <div className='lg:w-1/2 w-full'>
         <label  className='block mb-2 text-lg'>Job Title</label>
         <input type="text" defaultValue={"web Developer"} {...register("jobTitle")}
         className='create-job-input' />
          </div>

          <div className='lg:w-1/2 w-full'>
         <label  className='block mb-2 text-lg'>Company name</label>
         <input type="text" placeholder='Ex: Microsoft' {...register("companyName")}
         className='create-job-input' />
          </div>
          </div>
             {/*2nd row */}
   <div className='create-job-flex'>
          <div className='lg:w-1/2 w-full'>
         <label  className='block mb-2 text-lg'>Minimum Salary</label>
         <input type="text" placeholder='25k' {...register("minPrice")}
         className='create-job-input' />
          </div>

          <div className='lg:w-1/2 w-full'>
         <label  className='block mb-2 text-lg'>Maximum Salary</label>
         <input type="text" placeholder='$125k' {...register("maxPrice")}
         className='create-job-input' />
          </div>
          </div>
               {/* 3rd row*/}
          <div className='create-job-flex'>
          <div className='lg:w-1/2 w-full'>
         <label  className='block mb-2 text-lg'>Salary Type</label>
        <select {...register("salaryType")} className='create-job-input'>
          <option value={""}>choose your salary</option>
        <option value="Hourly">Hourly</option> 
        <option value="Monthly">Monthly</option>
        <option value="Yearly">Yearly</option>
        </select>
          </div>

          <div className='lg:w-1/2 w-full'>
         <label  className='block mb-2 text-lg'>Job Location</label>
         <input type="text" placeholder='Ex: New York' {...register("jobLocation")}
         className='create-job-input' />
          </div>
          </div>
        
             {/* 4th row*/}
             <div className='create-job-flex'>
          <div className='lg:w-1/2 w-full'>
         <label  className='block mb-2 text-lg'>Job Posting Date</label>
         <input type="date" placeholder='mm/dd/yy' {...register("postingDate")}
         className='create-job-input' />
          </div>

          <div className='lg:w-1/2 w-full'>
         <label  className='block mb-2 text-lg'>Experience Level</label>
         <select {...register("experienceLevel", { required: true })} className='create-job-input'>
          <option value={"Select Your Experience Level"}>Select Your Experience Level</option>
  <option value="Internship">Internship</option>
  <option value="Work remotely">Work remotely</option>
  <option value="No experience">No experience</option>
</select>

          </div>
          </div>

              {/*5th row*/}
              <div className=' w-full'>
         <label  className='block mb-2 text-lg'>Required Skill Seats</label>
       <CreatableSelect defaultValue={selectedOption}
       className='create-job-input py-4' onChange={setSelectedOption} options={options} isMulti/>

          </div>    

          {/* 6th row*/}
          <div className='create-job-flex'>
          <div className='lg:w-1/2 w-full'>
         <label  className='block mb-2 text-lg'>Company Logo</label>
         <input style={{fontSize:"40"}} type="url" placeholder='Paste Your company logo url:https://weshare.com/img1' {...register("companyLogo")}
         className='create-job-input' />
          </div>

          <div className='lg:w-1/2 w-full'>
         <label  className='block mb-2 text-lg'>Employment Type</label>
         <select {...register("employmentType", { required: true })} className='create-job-input'>
          <option value={"Select Your job type"}>Select Your job type</option>
  <option value="Temporary">Temporary</option>
  <option value="Full-time">Full-time</option>
  <option value="Part-time">Part-time</option>
</select>

          </div>
          </div>

          {/* 7th row */}
          <div className='w-full'>
            <label className='block mb-2 text-lg'>Required Skill Sets:</label>
            <textarea className='w-full pl-3 py-1.5 focus:outline-none placeholder:text-gray-600' {...register("description")}
            rows={6} placeholder='Job Description'
            
            defaultValue={"Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem incididunt."}/>
          </div>
 
 {/*last row */}
 <div className='w-full'>
 <label className='block mb-2 text-lg'>Job Posted By</label>
   <input
    type="email" 
     placeholder='your email'
     {...register("postedBy")}
     className='create-job-input'/>
 </div>
          
      <input type="submit"  className='block mt-12 bg-blue-800 text-white font-semibold  px-8 py-2 rounded-sm cursor-pointer'/>



    </form>
      </div>
    </div>
  )
}
