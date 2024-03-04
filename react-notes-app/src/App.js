import {useEffect}from 'react';
import {useState}from 'react';
import {nanoid} from 'nanoid';
import NotesList from "./components/notesList";
import Search from "./components/Search";
import Header from './components/Header';


const App=()=>{
  
  const[notes,setNotes]=useState(()=>{
    const savedNotes=JSON.parse(localStorage.getItem('react-notes-app-data'));
    return savedNotes||[
      {
      id:nanoid(),
      text:"This is my first note!",
      date:"25/02/2024"
    },
    {
      id:nanoid(),
      text:"This is my second note!",
      date:"26/02/2024"
    },
    {
      id:nanoid(),
      text:"This is my third note!",
      date:"27/02/2024"
    },
    {
      id:nanoid(),
      text:"This is my fourth note!",
      date:"28/02/2024"
    }
];
});

const [searchText,setSearchText]=useState('');

const [darkMode,setDarkMode]=useState(false);



useEffect(()=>{
  localStorage.setItem('react-notes-app-data',JSON.stringify(notes));
},[notes]);

const addNote=(text)=>{
    const date=new Date();
    const newNote={
      id:nanoid(),
      text:text,
      date:date.toLocaleDateString(),

    };
    const newNotes=[...notes,newNote];
    setNotes(newNotes);
};


const deleteNote=(id)=>{
    const newNotes=notes.filter((note)=>note.id!==id);
    setNotes(newNotes);
}

  return(
    <div className={`${darkMode && 'dark-mode'}`}>
      <div className="container">
        <Header handleToggleDarkMode={setDarkMode}/>
        <Search handleSearchNote={setSearchText}/>
        <NotesList 
          notes={notes.filter((note)=>note.text.toLowerCase().includes(searchText))} 
          handleAddNote={addNote} 
          handleDeleteNote={deleteNote}/>
      </div>
    </div>
    
  );
};

export default App;