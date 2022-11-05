"use strict";

const Products = (sequelize, DataTypes) =>
    sequelize.define("products", {
     
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
           
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
           
        },

        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            
        },
         quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
           
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
           
        }, imageURL1: {
            type: DataTypes.STRING,
            allowNull: false,
           
        }, imageURL2: {
            type: DataTypes.STRING,
            allowNull: true,
           
        },
        
    });

module.exports = Products;