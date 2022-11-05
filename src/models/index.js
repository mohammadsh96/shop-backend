"use strict";
require('dotenv').config();
const Collection = require("./collection");

const Users = require("./user.model");
const Products =require('./products')

const POSTGRES_URI = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL;

const {
    Sequelize,
    DataTypes
} = require("sequelize");


let sequelizeOptions =
    process.env.NODE_ENV === "production" ?
    {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            },
            native: true
        }
    } : {};

let sequelize = new Sequelize(POSTGRES_URI, sequelizeOptions);
const users = Users(sequelize, DataTypes);
const products = Products(sequelize, DataTypes);

// Users.hasMany(Products)
users.hasMany(products, {
    foreignKey: "userId",
    sourceKey: "id",
    onDelete:'cascade'
});

products.belongsTo(users, {
    foreignKey: "userId",
    targetKey: "id",
});

module.exports = {
    db: sequelize,
    products: new Collection(products),
    users:users,
};