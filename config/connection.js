// import the Sequelize constructor from the library
const Sequelize = require("sequelize");

// Notice how we don't have to save the require('dotenv') to a variable? 
// All we need it to do here is execute when we use connection.js 
// and all of the data in the .env file will be made available at process.env.<ENVIRONMENT-VARIABLE-NAME>.
require('dotenv').config();


// create connection to our database, pass in your MySQL information for username and password
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PW,
  {
    host: "localhost",
    dialect: "mysql",
    port: 3306,
  }
);

module.exports = sequelize;
