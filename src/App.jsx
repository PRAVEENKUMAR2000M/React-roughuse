//implement simple CRUD 


import axios from 'axios';
import React, { useEffect, useState } from 'react'


function App() {
  //method 1;

  // //define states
  // let [notes, setnotes] = useState([]);
  // //get the data
  // useEffect(() => {
  //   // run for the first time and only one time
  //   setnotes(props.notes);
  // }, []);
  //method 2;

  let [notes, setNotes] = useState([]);
  let [showStatus, setShowStatus] = useState('all');
  let [newNoteContent, setnewNoteContent] = useState('');
  let [newNoteImportant, setnewNoteImportant] = useState('');

  const fetchNotes = async () => {
    await axios.get("http://localhost:3000/notes")
    .then(response => {
      setNotes(response.data)
    })
  }

  useEffect(() => {
    axios.get("http://localhost:3000/notes")
      .then(response => {
        setNotes(response.data);
      })
      .catch(error => {
        console.error("error fetching data", error)
      });
  }, [])

  useEffect(() => {
    fetchNotes();
  }, []);

  let handleStatuschange = (event) => {
    setShowStatus(event.target.value)
  }

  let filterNotes = (notes, showStatus) => {
    switch (showStatus) {
      case 'all':
        return notes;
      case 'imp':
        return notes.filter(note => note.important === true);
      case 'non imp':
        return notes.filter(note => note.important === false);
    }
  }

  let notesFiltered = filterNotes(notes, showStatus);

  const addNote = (event) => {
    event.preventDefault();
    let noteObject = {
      id: notes.length + 1,
      content: newNoteContent,
      important: newNoteImportant === 'true'
    }
    setNotes(notes.concat(noteObject))
    setnewNoteContent('');
    setnewNoteImportant('');

    console.log('add new note adding...');
    axios.post('http://localhost:3000/notes', noteObject)
      .then(response => {
      console.log('new note added....')
    })
  }
  return (
    <div>
      <h1>Notes</h1>
      <label>
        <input
          type='radio'
          name='filter'
          value='all'
          checked={showStatus === 'all'}
          onChange={handleStatuschange}
        />
        All Notes
      </label>
      <label>
        <input
          type='radio'
          name='filter'
          value='imp'
          checked={showStatus === 'imp'}
          onChange={handleStatuschange}
        />
        Important Notes
      </label>
      <label>
        <input
          type='radio'
          name='filter'
          value='non imp'
          checked={showStatus === 'non imp'}
          onChange={handleStatuschange}
        />
        Non Important Notes
      </label>
      <ul>
        {
          notesFiltered.map(note => {
            return (
              <li key={note.id}>{note.content}</li>

            )
          })
        }
      </ul>
      <hr></hr>
      <form onSubmit={addNote}>
        <label>
          <h1>Add New Note</h1>
          content: &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
          <input
            type='text'
            typeof='submit'
            onChange={(e) => setnewNoteContent(e.target.value)}
            value={newNoteContent}
          />
          <br></br><br></br>
          important: &nbsp; &nbsp; &nbsp; &nbsp;
          <select onChange={(e) => setnewNoteImportant(e.target.value)}
            value={newNoteImportant}>
            <option>--select--</option>
            <option>true</option>
            <option>false</option>
          </select>
          <br></br><br></br>
          <button type='submit'>Add new note</button>
        </label>
      </form>
    </div>
  )
}

export default App;