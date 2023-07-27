const { Router } = require('express');
const router = Router();
const { renderCitaForm, 
        createNewCita, 
        renderCitas, 
        renderEditFormC, 
        updateCita, 
        deleteCita 
      } = require('../controllers/cita.controller');

const { isAuthenticated } = require('../helpers/auth');

//New cita
router.get('/cita/add', isAuthenticated, renderCitaForm);
router.post('/cita/new-cita', isAuthenticated, createNewCita);

//All citas
router.get('/cita', isAuthenticated, renderCitas);

//Edit cita
router.get('/cita/edit/:id', isAuthenticated, renderEditFormC);
router.put('/cita/edit/:id', isAuthenticated, updateCita);

//Eliminar cita
router.delete('/cita/delete/:id', isAuthenticated, deleteCita);

module.exports = router;