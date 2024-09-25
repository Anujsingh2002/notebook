import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

export default function NoteItem(props){
    const {note , updateNote}=props;
    const context=useContext(noteContext);
    const {deleteNote} =context;

    return (
        <div className='col-md-3'>
        
            <div className="card my-3">
                <img src="https://images.pexels.com/photos/834897/pexels-photo-834897.jpeg?auto=compress&cs=tinysrgb&w=600" className="card-img-top" alt="..." />
                <div className="card-body">
                    <div className="d-flex align-item-center">
                    <h5 className="card-title">{note.title}</h5>
                    <i role="button" className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)} }></i>
                    <i role="button" className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id);
                        props.showAlert("Deleted Successfully","success");
                    }}></i>
                    </div>
                    <p className="card-text">{note.desc}</p>
                </div>
            </div>
        </div>
    )
}
