const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    nombre: {type: String, required: true},
    edad: {type: Number, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
}, {
    timestamps: true
});

// Cifrar contraseña
UserSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

// Encriptar contraseña ingresada y comprar con 
// la contraseña guardada
UserSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare (password, this.password);
}

module.exports = model('User', UserSchema);