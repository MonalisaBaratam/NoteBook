import React, { useContext, useState } from 'react'
import NoteContext from '../context/notes/NoteContext'
import AlertContext from '../context/alert/AlertContext'

function AddNote() {
    const context = useContext(NoteContext)
    const {addNote} = context
    const context1 = useContext(AlertContext)
    const {showAlert} = context1
    const [note,setNote] = useState({title:"",description:"",tag:""})
    const handleClick = (e)=>{
        e.preventDefault();
        console.log("click");
        addNote(note.title,note.description,note.tag)
        showAlert("Added Successfully","success")
        setNote({title:"",description:"",tag:""})
    }
    const onChange =(event)=>{
        setNote({...note,[event.target.name]:event.target.value})
    }
  return (
    <section className='container addnote'>
  <div className='login-container'>
      <div className="form-container">
        <h1 className='opacity'>Add Note</h1>
        <form>
            <input type="text" placeholder='Enter Title' id="title" name="title"aria-describedby="emailHelp" value={note.title} onChange={onChange} />
            <input type="text" placeholder='Enter Description' value={note.description} id="description" name="description" onChange={onChange}/>
            <input type="text" placeholder='Enter Tag' value={note.tag} id="tag" name="tag" onChange={onChange}/>
          <button type="submit" disabled={note.title.length<5 || note.description.length<5} className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
        </div>
    </div>
    </section>
  )
}

export default AddNote
