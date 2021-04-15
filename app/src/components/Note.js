
function Note({ note, handleNoteImportant }) {


    return (
        <div>
            <h3>{note.title}</h3>
            {
                note.important
                    ? <span>Importante</span>
                    : ''
            }
            <p>{note.content}</p>
            <button onClick={handleNoteImportant}>
                {
                    note.important
                        ? 'No importante'
                        : 'Importante'
                }
            </button>
        </div >
    );
}

export default Note;
