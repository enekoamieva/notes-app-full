import axios from 'axios';

const baseURL = '/api/notes/'
//const baseURL = 'https://stark-river-41113.herokuapp.com/api/notes/'

export const getNotes = () => {
    return axios.get(baseURL);
}

export const updateNotes = (id, updateNote) => {
    //console.log(updateNote);
    //const update = updateNote.important
    return axios.put(`${baseURL}${id}`, { updateNote });
}

export const addNote = (newNote, token) => {
    //Configurar los headers para esta request y mandarle el token de autorizacion de nuestro usuario
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };

    return axios.post(baseURL, newNote, config)
}