const {Schema, model} = require('mongoose');

const AgendaSchema = new Schema({
    evento:{
        type: String,
        required: true
    },
    fecha:{
        type: Date,
        required: true
    },
    comentario:{
        type: String,
        required: true
    },
    user:{
        type: String,
        required: true
    }
}, {
    timestamps: true
})

module.exports = model('Agenda', AgendaSchema);