const { Schema, model } = require('mongoose');

const todoSchema = new Schema (
    {
        title: {type: String},
        completed: {type: Boolean, default: false},
    },
    {
        timestamp: true,
    },
);

module.exports = model('Todo', todoSchema);