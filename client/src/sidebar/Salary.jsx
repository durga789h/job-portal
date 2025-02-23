import React from 'react'
import Button from './Button'
import InputField from '../components/InputField'


const Salary = ({handleChange,handleClick}) => {
  return (
    <div>
      <h4 className='text-lg font-medium mb-2'>salary</h4>
      <div className='flex justify-start mb-4'>
        <Button onClickHandler={handleClick} value={""} title={"Hourly"}/>
        <Button onClickHandler={handleClick} value={"monthly"} title={"monthly"}/>
        <Button onClickHandler={handleClick} value={"yearly"} title={"yearly"}/>
      </div>
      <div>
      <label className='sidebar-label-container'>
                    <input
                        type="radio"
                        name="test"
                        id="test"
                        value=""
                        onChange={handleChange}
                    />
                    <span className='checkmark'></span>All
                </label>

                <InputField 
                 handleChange={handleChange}
                  value={30}
                  title="<30000k" 
                  name="test2" 
                  />
                   <InputField 
                 handleChange={handleChange}
                  value={50}
                  title="<50000k" 
                  name="test2" 
                  />
                   <InputField 
                 handleChange={handleChange}
                  value={80}
                  title="<80000k" 
                  name="test2" 
                  />
                   <InputField 
                 handleChange={handleChange}
                  value={100}
                  title="<1000000k" 
                  name="test2" 
                  />
      </div>
    </div>
  )
}

export default Salary
