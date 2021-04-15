const { Schema, model } = require('mongoose');

//Crear Schema para los documentos de la coleccion NOTAS
const noteSchema = new Schema({
    content: String,
    title: String,
    date: Date,
    important: { type: Boolean, default: false },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
});

//Transformas nuestro Schema para que devuelva el valor del objeto id a parte del valor _id que setea por defecto Mongodb
//Eliminamos de la petición los valores __v y _id
noteSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id,
            delete returnedObject._id,
            delete returnedObject.__v
    }
});

//Creamos un modelo de nuestro esquema para que pueda ser usado como modelo para insertar, consultar, ... en nuestra coleccion 
const NoteModel = model('Note', noteSchema);

//Exportamos el modelo creado
module.exports = NoteModel;