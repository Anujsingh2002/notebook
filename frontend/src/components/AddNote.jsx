import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({title:" ",desc:" ",tag:" "})
  


  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title,note.desc,note.tag);
    setNote({title:"",desc:"",tag:""})
    props.showAlert("Added Successfully","success");
  }

  const handleChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
  }
  return (
    <div>
      <h1>Add a note!</h1>
      <form className='my-3'>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input  type="text" className="form-control" value={note.title} id="title" name="title" aria-describedby="emailHelp" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="desc" className="form-label">Description</label>
          <input  type="text" className="form-control" value={note.desc} id="desc" name="desc" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input  type="text" className="form-control" value={note.tag} id="tag" name="tag" onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note!</button>
      </form>
    </div>
  )
}

export default AddNote