const { User, Thoughts } = require('../models');  //add thought if we are removing the associated ones


module.exports = {
    //get all users
    getUsers(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => restart.status(500).json(err));
    },
    //get one user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
          .select('-__v') 
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
    // create a new user
    createUser(req, res) {
        User.create(req.body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(500).json(err));
    },
    //update user !!!
    //updating the user by the user id that we're including in url parameter and the user that is attached to it, it will set it in the req. body
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body }, 
            { runValidators: true, new: true }
            )
        .then((user) => 
        !user
          ? res.status(404).json({ message: 'No user with this id' })
          : res.json(user)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
    },
    //delete user by ID AND associated 'thoughts' lol
    //IS THIS CORRECT THOOOOOOOOOOO
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
            .then((user) =>
            !user
                ? res.status(404).json({ message: 'No user with that ID' })
                : Thoughts.deleteMany({ _id: { $in: user.thoughts } })
            )
            .then(() => res.json({ message: 'User and thoughts deleted!' }))
            .catch((err) => res.status(500).json(err));
    },
    addFriend(req, res) {
        console.log('You are adding a friend');
        console.log(req.body);
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: { friends: req.params.friendId } },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res
                  .status(404)
                  .json({ message: 'No friend found with that ID :(' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
      removeFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friend: { friend: req.params.friendId } } },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res
                  .status(404)
                  .json({ message: 'No user found with that ID' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
};

