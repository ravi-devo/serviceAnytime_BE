const express = require('express');
const ticketController = require('../controller/ticketController');
const authMiddleware = require('../middleware/authMiddleware');
const adminAuthMiddleware = require('../middleware/adminAuthMiddleware');

const router = express.Router();

router.post('/createTicket', authMiddleware, ticketController.createTicket);
router.get('/allTickets', adminAuthMiddleware, ticketController.getAllTickets);
router.get('/currentUser', authMiddleware, ticketController.getUserSpecificTicket);
router.get('/:id', authMiddleware, ticketController.getSpecificTicket);
router.put('/:ticketId', authMiddleware, ticketController.updateTicket);
router.delete('/:ticketId', adminAuthMiddleware, ticketController.deleteTicket);

module.exports = router;