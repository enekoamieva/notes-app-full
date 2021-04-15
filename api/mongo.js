const mongoose = require('mongoose');

//Extraer todas las variables de entorno
const { MONGODB_URI, MONGODB_URI_TEST, NODE_ENV } = process.env;

//Usar BD en produccion o de test en funcion de NODE_ENV
const connectionString = NODE_ENV === 'test' ? MONGODB_URI_TEST : MONGODB_URI;

//Establecemos configuraciones para evitar avisos del servidor
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);

//Esblecemos conexión a nuestra base de datos
mongoose.connect(connectionString)
    .then(() => console.log('MONGODB CONNECTED!'))
    .catch(error => console.log(error));



//Instanciamos un objeto de nuestro modelo para poder realizar operaciones
/* const newNote = new NoteModel({
    content: 'Esto es el contenido número 2',
    title: 'Esto es el título número 2',
    date: new Date(),
    important: false
}); */

//Guardamos el objeto anterior en nuestra BD
/* newNote.save()
    .then(response => console.log(response))
    .catch(error => console.log(error)); */

//Buscar el contenido en nuestra colección con nuestro modelo
/* NoteModel.find({})
    .then(response => console.log(response))
    .catch(error => console.log(error)); */