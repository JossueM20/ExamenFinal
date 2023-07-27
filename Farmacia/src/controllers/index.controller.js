const indexCtrl = {};
const Evento = require('../models/Evento');

indexCtrl.renderIndex = async (req, res) => {
    const eventos = await Evento.find().lean().sort({createdAt: 'desc'});
    res.render('index', {eventos});
};

indexCtrl.renderAbout = (req, res) => {
    res.render('about')
};

indexCtrl.renderEncuesta = (req, res) => {
    res.render('./additional/encuesta')
};

indexCtrl.renderMaterial = (req, res) => {
    res.render('./additional/material')
};

module.exports = indexCtrl;