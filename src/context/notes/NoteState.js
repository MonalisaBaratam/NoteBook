import { useState } from "react";
import NoteContext from "./NoteContext";
const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial =[]
  const [notes, setNotes] = useState(notesInitial)
//Get all notes
const getNotes = async() => {
  //Api Call
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "auth-token": localStorage.getItem('token')
    }
  });
  const json = await response.json()
  setNotes(json.notes)
}
  //addnote
  const addNote = async(title, description, tag) => {
    //Api Call
    console.log("came");
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag})
    });
    const json = await response.json()
    //client side edit note
    console.log("adding a new note");
    console.log(json);
    console.log(json.savedNote);
    setNotes(notes.concat(json.savedNote))
  }
  //delete note
  const deleteNote = async(id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });
    const json = response.json()
    console.log(json);
    console.log("deleting the note with id" + id);
    let newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }
  //editNote
  const editNote = async (id, title, description, tag) => {
    //API CALL
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title,description,tag}),
    });
    const json = response.json();
    console.log(json);
    console.log("done in backend edit");
    // //EDIT IN FRONT END CLIENT SIDE
    let newNotes = JSON.parse(JSON.stringify(notes))
    console.log(notes);
    for (let index = 0; index <= newNotes.length; index++) {
      const element = newNotes[index]
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes}}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;