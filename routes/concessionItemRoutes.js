const express = require('express');
const router = express.Router();
const concessionItemController = require('../controllers/concessionItemController');

// Create a new concession item
router.post('/', concessionItemController.createConcessionItem);
router.get('/', concessionItemController.getAllConcessionItems);
router.get('/:id', concessionItemController.getConcessionItemById);
router.put('/:id', concessionItemController.updateConcessionItem);
router.delete('/:id', concessionItemController.deleteConcessionItem);

module.exports = router;