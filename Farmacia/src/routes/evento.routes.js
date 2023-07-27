const { Router } = require('express');
const router = Router();
const { renderEventoForm, 
        createNewEvento, 
        renderEventos, 
        renderEditFormE, 
        updateEvento, 
        deleteEvento 
      } = require('../controllers/evento.controller');

const { isAuthenticated } = require('../helpers/auth');
//New cita
router.get('/evento/add', isAuthenticated, renderEventoForm);
router.post('/evento/new-evento', isAuthenticated, createNewEvento);

//All citas
router.get('/evento', isAuthenticated, renderEventos);

//Edit cita
router.get('/evento/edit/:id', isAuthenticated, renderEditFormE);
router.put('/evento/edit/:id', isAuthenticated, updateEvento);

//Eliminar cita
router.delete('/evento/delete/:id', isAuthenticated, deleteEvento);

module.exports = router;