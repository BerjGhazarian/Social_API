const { Thought, User } = require('../models');

module.exports = {
    getThoughts(req, res) {
      Thought.find()
        .populate('reactions')
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
  
    getThoughtById(req, res) {
      Thought.findOne({ _id: req.params.id })
        .populate('reactions')
        .select('-__v')
        .then((thoughts) =>
          !thoughts
            ? res.status(404).json({ message: 'No User with that ID' })
            : res.json({ thoughts })
        )
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },
    createThoughts(req, res) {
        Thought.create(req.body)
          .then(({ _id }) => {
            return User.findOneAndUpdate(
              { _id: req.params.userId },
              { $push: { thoughts: _id } },
              { new: true }
            );
          })
          .then((user) =>
            !user
              ? res.status(404).json({
                message: 'no user with that ID',
              })
              : res.json(user)
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
    
      deleteThoughts(req, res) {
        Thought.findOneAndDelete({ _id: req.params.id })
          .then((thoughts) =>
            !thoughts
              ? res.status(404).json({ message: 'No thoughts with this id!' })
              : res.json({ message: 'This thought has been deleted' })
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      updateThoughts(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.id }, { $set: req.body },
          { new: true })
          .then((thoughts) =>
            !thoughts
              ? res.status(404).json({ message: 'No thoughts with this id!' })
              : res.json(thoughts)
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
      addReactions(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } }, { new: true })
          .then((thoughts) =>
            !thoughts
              ? res.status(404).json({ message: 'No thoughts with this id!' })
              : res.json(thoughts)
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
    