const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThoughts,
  updateThoughts,
  deleteThoughts,
  addReactions,
  deleteReactions,
} = require('../../controllers/thoughtController.js');

router.route('/')
  .get(getThoughts);

router.route('/:userId/')
  .post(createThoughts);

router.route('/:id')
  .get(getSingleThought)
  .delete(deleteThoughts)
  .put(updateThoughts);

router.route('/:thoughtId')
  .post(addReactions);

router.route('/:reactionId')
  .delete(deleteReactions);

module.exports = router;