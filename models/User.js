const { Schema, model } = require('mongoose');
const userSchema = new Schema(
    {
      username: {
        type: String,
        unique: true,
        require: true,
        trim: true
      },
      email: {
        type: String,
        require: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
      },
      thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Thought',
        },
      ],
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User',
        },
      ],
    },
    {
      toJSON: {
        getters: true,
        virtual: true
      },
      id: false,
    }
  );
  userSchema
  .virtual('friendCount')
        .get(function () {
            let friendsList = this.friends.length;
                return `You have ${friendsList} friends on your friends list.`
  });

const User = model('User', userSchema);

module.exports = User;