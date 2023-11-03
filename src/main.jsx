import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'


const notes = [
  {
    id: 1,
    content: "praveenkumar BE",
    important: true
  },
  {
    id: 2,
    content: "working as a IT support Engineer",
    important: false
  },
  {
    id: 3,
    content: "currently full stack web developer",
    important: true
  },
  {
    id: 4,
    content: "in feature businessman",
    importand: false
  },
];

ReactDOM.createRoot(document.getElementById('root')).render(<App notes={notes} />)
