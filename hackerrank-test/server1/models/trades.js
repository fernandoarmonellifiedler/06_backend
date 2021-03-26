// Uncomment the code below to use Sequelize ORM
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
const sequelize = new Sequelize('sqlite::memory:');

// Uncomment the code below to use Mongoose ORM
// const mongoose = require('mongoose');

// Insert your model definition below
const Trades = sequelize.define(
  'Trades',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      type: DataTypes.STRING,
    },
    user_id: {
      type: DataTypes.NUMBER,
    },
    symbol: {
      type: DataTypes.STRING,
    },
    shares: {
      type: DataTypes.NUMBER,
    },
    price: {
      type: DataTypes.NUMBER,
    },
    timestamp: {
      type: DataTypes.NUMBER,
    },
  },
  {
    // Other model options go here
    freezeTableName: true,
    timestamps: false
  }
);

module.exports = Trades;
