const citaCtrl = {};
const Cita = require('../models/Agenda');
const Evento = require('../models/Evento');
require('../config/passport');

citaCtrl.renderCitaForm = (req, res) => {
    res.render('./citas/new-cita')
};

citaCtrl.createNewCita = async (req, res) => {
    const { evento, fecha, comentario } = req.body;
    const newCita = new Cita({ evento, fecha, comentario });
    newCita.user = req.user._id;
    await newCita.save();
    req.flash('success_msg', 'Cita Agendada Satisfactoriamente');
    res.redirect('/cita');
};

citaCtrl.renderCitas = async (req, res) => {
    const citas = await Cita.find({user: req.user._id}).lean().sort({createdAt: 'desc'});
    res.render('./citas/all-citas', { citas });
};

citaCtrl.renderEditFormC = async (req, res) => {
    const citas = await Cita.findById(req.params.id).lean();
        if(citas.user != req.user.id) {
            req.flash('error_msg', 'No autorizado');
            return res.redirect('/cita');
        }
    res.render('./citas/edit-cita', { citas });
};

citaCtrl.updateCita = async (req, res) => {
    const {evento, fecha, comentario} = req.body;
    await Cita.findByIdAndUpdate(req.params.id, {evento, fecha, comentario});
    req.flash('success_msg', 'Actualizado Satisfactoriamente');
    res.redirect('/cita');
};

citaCtrl.deleteCita = async (req, res) => {
    await Cita.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Eliminado Satisfactoriamente');
    res.redirect('/cita');
};

citaCtrl.renderEventos = async (req, res) => {
    const eventos = await Evento.find().lean().sort({createdAt: 'desc'});
    res.render('./eventos/all-eventos', { eventos });
};

module.exports = citaCtrl;