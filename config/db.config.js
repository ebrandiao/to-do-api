const mongoose = require('mongoose');

const connect = async (req, res, next) => {
    const connection = await mongoose.connect(process.env.MONGO_URI);
    console.log(`database connectd: ${connection.connections[0].name}`);
};

module.exports = connect;