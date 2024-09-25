import React, { useContext ,useEffect} from 'react'
import noteContext from '../context/notes/noteContext';

const About = () => {
  

  return (
    <div className='d-flex '>
      <div >
        <img style={{
        width:'100%',
        height: '500px'
      }} src="https://images.pexels.com/photos/733857/pexels-photo-733857.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
      </div>
      <div >
         <h1 >NOTEBOOK</h1>
         <p>
          This is a Notebook website where people can create their personal notes for free.
         </p>
         <p>
         This service is provided by Anuj Pratap Singh.
         </p>
         <p>
          <h5>
            Contact us: 
          </h5>
          aps***@gmail.com
         </p>
      </div>
    </div>
  )
}

export default About