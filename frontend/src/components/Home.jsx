import React,{useContext} from 'react'
import Notes from './Notes';
import AddNote from './AddNote';

const Home = (props) => {
  const {showAlert} = props;
  return (
    <div className='container my-3 '>
      
      <Notes showAlert={showAlert}/>
    </div>
  )
}

export default Home;