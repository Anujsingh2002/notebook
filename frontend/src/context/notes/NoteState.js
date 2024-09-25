import { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
    let host = "https://notebook-backend-994b.onrender.com"
    let initialNotes = [];
    const [notes, setNotes] = useState(initialNotes);

    ///get alls note
    const getNotes = async () => {

        try {
            //server side
            const response = await fetch(`${host}/api/notes/fetchallnotes`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "authToken": localStorage.getItem('token')
                }
                // ,body: JSON.stringify()
            });
            const jsn = await response.json();
            // console.log(jsn);
            setNotes(jsn);
            //client side
        } catch (error) {
            console.log("failed to load", error)
        }
    }

    ///add note
    const addNote = async (title, desc, tag) => {

        try {
            //server side
            const response = await fetch(`${host}/api/notes/addnote`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "authToken": localStorage.getItem('token')
                },
                body: JSON.stringify({ title, desc, tag })
            });
            const note = await response.json();

            //client side
            setNotes(notes.concat(note))
        } catch (error) {
            console.log(error);
        }

    }

    ///delete note
    const deleteNote = async (id) => {

        //server side
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "authToken": localStorage.getItem('token')
            }
        });
        // const jsn =await response.json();
        // console.log(jsn);

        //client side

        console.log(`deleting ` + id);
        const newNotes = notes.filter((note) => (note._id !== id))
        setNotes(newNotes);
    }

    ///edit note

    const editNote = async (id, title, desc, tag) => {

        //server side
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "authToken": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, desc, tag })
        });
        const json = await response.json();

        let newNotes = JSON.parse(JSON.stringify(notes));
        //client side
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].desc = desc;
                newNotes[index].tag = tag;
                setNotes(newNotes);
            }
        }
    }
    return (
        <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;



////////////////////////////////////BOILER PLATE//////////////////////////////////////////////

// import noteContext from "./noteContext";

// const NoteState = (props)=>{

// const state= {
//     name:"anuj",
//     roll:"cse"
// }
//     return (
//         <noteContext.provider value={state}>
//             {props.children}
//         </noteContext.provider>
//     )
// }

// export default NoteState;
