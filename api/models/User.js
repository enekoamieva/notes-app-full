const { Schema, model } = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new Schema({
    username: {
        type: String,
        unique: true
    },
    name: String,
    passwordHash: String,
    notes: [{
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }]
});

//Transformas nuestro Schema para que devuelva el valor del objeto id a parte del valor _id que setea por defecto Mongodb
//Eliminamos de la petición los valores __v y _id y tambien nos aseguramos que nunca nos devuelva el password
userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id,
            delete returnedObject._id,
            delete returnedObject.__v,
            delete returnedObject.passwordHash
    }
});

userSchema.plugin(uniqueValidator);

//Instanciamos
const UserModel = model('User', userSchema);

module.exports = UserModel;