const router = require('express').Router();
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought, 
    deleteThought
  } = require('../../controllers/thoughtController');

// /api/thoughts - create thought
router.route('/').get(getThoughts).post(createThought);

router
.route('/:thoughtId')
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought); 

///api/thoughts/:thoughtId/reactions

// create reaction stored in a thought's 'reactions' array
// router.route('/:thoughtId/reactions')
//   .post()
//   .delete();

module.exports = router;