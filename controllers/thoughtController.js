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