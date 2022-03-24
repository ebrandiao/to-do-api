const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true
    },

    email: {
      type: String,
      required: true,
      match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
     },

    password: {
      type: String
     },

    todos: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Todo'
      }
    ]
  },
  {
    timestamp: true
  }
)
module.exports = model('User', userSchema);
