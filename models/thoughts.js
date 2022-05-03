const { Schema, Types, model } = require('mongoose');
const reactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      reactionBody: {
        type: String,
        require: true,
        maxLength: 280
      },
      username: {
        type: String,
        require: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => Date(date).toLocaleDateString()
  
      }
    },
    {     toJSON: {
        getters: true,
      },
    }
  );
  const thoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        require: true,
        minLength: 1,
        maxLength: 280
      },
      reactionBody: {
        type: String,
        require: true,
        maxLength: 280
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => Date(date).toLocaleDateString()
      },
      username: {
        type: String,
        require: true,
      },
      reactions:
        [reactionSchema],
    },
    {
      toJSON: {
        getters: true,
        virtuals: true
      },
      id: false,
    }
  );