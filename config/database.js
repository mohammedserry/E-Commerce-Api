const mongoose = require("mongoose");

const dbConnection = () => {
  mongoose.connect(process.env.MONGODB_URL).then((conn) => {
    console.log(`MongoDB connected: ${conn.connection.host}`);
  });
};

module.exports = dbConnection;
