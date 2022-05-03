const { User, Thought } = require('../models');

module.exports = {
    getUser(req, res) {
      User.find()
        .populate('friends')
        .then((users) => {
          return res.json(users);
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json(err);
        });
    },