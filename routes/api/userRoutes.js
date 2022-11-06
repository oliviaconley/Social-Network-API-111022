const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser
  } = require('../../controllers/userController');

// /api/users - create user
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId - get single user
router.route('/:userId').get(getSingleUser);


//ARE THESE NECESSARY??? AND IF NOT, THEN WHY AREN'T THEY???
// /api/users/:userId - update user?? 
router.route('/:userId').get(getSingleUser).put(updateUser);

// /api/users/:userId - delete user 
router.route('/:userid').get(getSingleUser).delete(deleteUser);

module.exports = router;