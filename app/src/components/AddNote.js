import { useState, useRef } from 'react';
import { addNote } from '../services/notes';
import Toggable from './Toggable';

function AddNote({ notes, setNotes, user }) {

    //STATE
    const [note, setNote] = useState('');

    //REF
    const toggableRef = useRef();

    const handleChange = (event) => {
        setNote(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        //Coger la ultima ID
        /* const ids = notes.map(note => note.id);
        const maxId = Math.max(...ids); */

        const newNote = {
            //id: maxId + 1,
            title: note,
        }

        //Save Note
        addNote(newNote, user.token)
            .then(returnedNote => {
                console.log(returnedNote);
                setNotes(notes.concat(returnedNote.data));
            });

        setNote('');

        //A partir de la referencia para el componente, llamamos a una funcion creada en el para que cierre el formulario al enviar
        toggableRef.current.toggleVisibility();
    }

    return (
        <Toggable buttonLabel="Nueva Nota" ref={toggableRef}>
            <form onSubmit={handleSubmit} >
                <input
                    type="text"
                    onChange={handleChange}
                    value={note}
                    placeholder="Introduce una nota"
                />
                <button id="form-submit-note-button">Guardar</button>
            </form>
        </Toggable>
    );
}

export default AddNote;