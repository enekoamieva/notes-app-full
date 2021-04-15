import { useState, useEffect } from 'react';
//import axios from 'axios';
import { getNotes, updateNotes } from './services/notes';
//Componentes
import Note from './components/Note.js';
import AddNote from './components/AddNote';
import Login from './components/Login';
import Logout from './components/Logout';
import Notification from './components/Notification';

function App() {

    //State
    const [notes, setNotes] = useState([]);
    const [showAll, setShowAll] = useState(false);

    const [errorMessage, setErrorMessage] = useState(null);

    const [user, setUser] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    //Use effect
    useEffect(() => {
        getNotes().then(notes => {
            setNotes(notes.data);
        })
    }, [])

    useEffect(() => {
        //Efecto para comprobar si el usuario tiene el token en localstorage
        const logged = window.localStorage.getItem('loggedUser');
        if (logged) {
            const loggedUser = JSON.parse(logged);
            setUser(loggedUser);
        }
    }, [])

    //Functions
    const handleShowAll = () => {
        setShowAll(!showAll)
    }

    const handleNoteImportant = (id) => {
        const note = notes.find(note => note.id === id)
        const updateNote = { ...note, important: !note.important }

        console.log(updateNote);
        updateNotes(id, updateNote)
            .then(setNotes(notes.map(note => note.id !== id ? note : updateNote)))
    }

    const showNotes = showAll
        ? notes.filter(note => note.important === true)
        : notes
        ;

    const showLogin = !user
        ? <Login
            setErrorMessage={setErrorMessage}
            username={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            setUser={setUser}
        />
        : <Logout
            user={user}
            setUser={setUser}
        />

    return (
        <div className="App">

            <h1>Notes App</h1>

            {
                errorMessage && (
                    <Notification
                        errorMessage={errorMessage}
                    />
                )
            }

            {showLogin}

            <br />

            {
                user && (
                    <AddNote
                        notes={notes}
                        setNotes={setNotes}
                        user={user}
                    />
                )
            }

            <hr />

            {
                showNotes && (showNotes.map(note => (
                    <Note
                        key={note.id}
                        note={note}
                        handleNoteImportant={() => handleNoteImportant(note.id)}
                    />
                )))
            }

            <center>
                <button onClick={handleShowAll}>
                    {
                        showAll
                            ? 'Mostrar todas'
                            : 'Mostrar importantes'
                    }
                </button>
            </center>


        </div >
    );
}

export default App;
