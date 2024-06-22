import React from 'react'

export default function Jobs({result}) {
  return (
    <>
    <div>
    <h3 className='text-lg-font-bold mb-2'>{result.length} jobs</h3>
    </div>
   <section >
   {result}
   </section>
    </>
  )
}
