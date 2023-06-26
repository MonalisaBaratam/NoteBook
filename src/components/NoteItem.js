import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext';

function NoteItem(props) {
    const { note,updateNote } = props;
    const context = useContext(NoteContext)
    const {deleteNote} = context
    return (
        <div className='col-md-3 noteitem'>
            <div className="card my-3 mx-2">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}></i>
                    <i className="fa-regular fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
