import React, { useContext, useEffect, useRef,useState } from 'react'
import NoteContext from '../context/notes/NoteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import AlertContext from '../context/alert/AlertContext';
import { useNavigate } from 'react-router-dom';
const Notes = () => {
  const navigate = useNavigate()
  const context = useContext(NoteContext);
  const context1 = useContext(AlertContext)
  const {showAlert} = context1
  const { notes, getNotes,editNote } = context;
  const [note,setNote] = useState({id:"",etitle:"",edescription:"",etag:""})
    const handleClick = (e)=>{
        console.log("updating");
        editNote(note.id,note.etitle,note.edescription,note.etag);
        refclose.current.click();
        showAlert("Updated Successfully","success")
    }
    const onChange =(event)=>{
        setNote({...note,[event.target.name]:event.target.value})
    }
    // eslint-disable-next-line
  useEffect(() => {
    // eslint-disable-next-line
    console.log("hello");
    if(localStorage.getItem('token')){
      getNotes();
    }
    else{
      navigate('/login')
    }
  },[])
  // eslint-disable-next-line
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
  }
  const ref = useRef(null)
  const refclose = useRef(null)
  return (
    <div className='notesmain'>
      <AddNote />
      <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content bg-dark">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" value={note.etitle} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" ref={refclose}>Close</button>
              <button type="button" disabled={note.etitle.length<5||note.edescription.length<5} onClick={handleClick} className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="noteslist">
        <h1>Your Notes</h1>
        <ul className='notesall row'>
          {notes.map((note) => {
            return <NoteItem key={note._id} updateNote={updateNote} note={note} />
          })}
        </ul>
      </div>
    </div>
  )
}

export default Notes
