import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
    let navigate=useNavigate();

    const context = useContext(noteContext);
    const { notes, addNote, getNotes ,editNote} = context;

    useEffect(() => {
        // getNotes()
        // console.log("first")
        if(localStorage.getItem('token')){
            getNotes()
        }
        else{
            navigate('/login');
        }
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id:currentNote._id,etitle:currentNote.title,edesc:currentNote.desc,etag:currentNote.tag})
        
    }

    const ref = useRef(null);
    const refClose=useRef(null);

    const [note, setNote] = useState({id:"",etitle:"",edesc:"",etag:""})
    const handleClick = (e) => {
        // e.preventDefault();
        // console.log("updating note from modal",note)
        editNote(note.id,note.etitle,note.edesc,note.etag)
        refClose.current.click();
        // addNote(note.title,note.desc,note.tag);
        props.showAlert("Updated Successfully","success");
      }
    
      const handleChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
      }

    return (
        <>
            <AddNote showAlert={props.showAlert}/>


            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                d-none class has been used so it wont show on UI ,Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">


                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" value={note.etitle} id="etitle" name="etitle" aria-describedby="emailHelp" onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edesc" className="form-label">Description</label>
                                    <input type="text" className="form-control" value={note.edesc} id="edesc" name="edesc" onChange={handleChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" value={note.etag} id="etag" name="etag" onChange={handleChange} />
                                </div>
                            </form>


                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" onClick={handleClick} className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row my-3'>
                
                { notes.length!==0 ?<h1>Your notes here!</h1> : <h3 className="container">nothing to show</h3>}
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes