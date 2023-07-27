const eventoCtrl = {};
const Evento = require('../models/Evento');
const { unlink } = require('fs-extra');
const path = require('path');

eventoCtrl.renderEventoForm = (req, res) =>{
    res.render('./eventos/new-evento')
};

eventoCtrl.createNewEvento = async (req, res) => {
    const evento = new Evento();
    evento.titulo = req.body.titulo;
    evento.descripcion = req.body.descripcion;
    evento.filename = req.file.filename;
    evento.path = '/img/uploads/' + req.file.filename;
    evento.originalname = req.file.originalname;
    evento.mimetype = req.file.mimetype;
    evento.size = req.file.size;
    await evento.save();
    req.flash('success_msg', 'Evento Creado Satisfactoriamente');
    res.redirect('/evento');
};

eventoCtrl.renderEventos = async (req, res) => {
    const eventos = await Evento.find().lean().sort({createdAt: 'desc'});
    res.render('./eventos/all-eventos', { eventos });
};

eventoCtrl.renderEditFormE = async (req, res) => {
    const { id } = req.params;
    const evento = await Evento.findById(id).lean();
    res.render('./eventos/edit-evento', { evento });
};

eventoCtrl.updateEvento = async (req, res) => {
    const {filename, path, originalname} = req.file;
    const {mimetype} = req.file.mimetype; 
    const {size} = req.file.size;
    const {titulo, descripcion} = req.body;
    await Evento.findByIdAndUpdate(req.params.id, {filename, path:'/img/uploads/'+filename, originalname, mimetype, size, titulo, descripcion});
    req.flash('success_msg', 'Actualizado Satisfactoriamente');
    res.redirect('/evento');
};

eventoCtrl.deleteEvento = async (req, res) => {
    const { id } = req.params;
    const evento = await Evento.findByIdAndDelete(id).lean();
    await unlink(path.resolve('./src/public' + evento.path));
    req.flash('success_msg', 'Eliminado Satisfactoriamente');
    res.redirect('/evento');
};

module.exports = eventoCtrl;