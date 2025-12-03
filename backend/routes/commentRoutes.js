var express = require('express');
var router = express.Router();
var commentController = require('../controllers/commentController.js');

/*
 * GET
 */
router.get('/', commentController.list);

/*
 * GET
 */
router.get('/:id', commentController.show); // get all comments for a photo id (not a comment id)

/*
 * POST
 */
router.post('/', commentController.create);
router.post('/like', commentController.like);
router.post('/dislike', commentController.dislike);

/*
 * PUT
 */
router.put('/:id', commentController.update);

/*
 * DELETE
 */
router.delete('/:id', commentController.remove);

module.exports = router;
