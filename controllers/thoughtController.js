const { Thought, User } = require('../models'); 

module.exports = {
    getThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => restart.status(500).json(err));
    },
    getSingleThought(req, res) {
        User.findOne({ _id: req.params.thoughtId })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with that ID' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
    //create
    createThought(req, res) {
        Thought.create(req.body)
          .then((thought) => {
            return Thought.findOneAndUpdate(
              { _id: req.body.thoughtId }, //passing the id from mongo db to the req.body
              { $addToSet: { thoughts: thought._id } }, //adding to the user array
              { new: true }
            );
          })
          .then((user) =>
            !user
              ? res.status(404).json({
                  message: 'Thought created, but found no user with that ID',
                })
              : res.json('Created the THOT')
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
    //updating the thought by the application id that we're including in url parameter and the user that is attached to it, it will set it in the req. body
    updateThought(req, res) {
        Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body }, 
        { runValidators: true, new: true }
        )
         .then((thought) =>
         !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought)
        )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
     },
    //delete 
    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with this id!' })
              : User.findOneAndUpdate( //if it exists it finds the user 
                  { applications: req.params.thoughtId },
                  { $pull: { applications: req.params.thoughtId } }, //deletes that pp id from the users array 
                  { new: true }
                )
          )
          .then((user) =>
            !user
              ? res.status(404).json({
                  message: 'Thought created but no user with this id!',
                })
              : res.json({ message: 'Thought successfully deleted!' })
          )
          .catch((err) => res.status(500).json(err));
      },
}