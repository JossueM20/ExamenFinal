const {Schema, model} = require('mongoose');

const EventoSchema = new Schema({
    titulo:{
        type: String,
        required: true
    },
    descripcion:{
        type: String,
        required: true
    },
    filename:{
        type: String,
    },
    path:{
        type: String,
    },
    originalname:{
        type: String,
    },
    mimetype:{
        type: String,
    },
    size:{
        type: Number,
    }
}, {
    timestamps: true
})

module.exports = model('Evento', EventoSchema);