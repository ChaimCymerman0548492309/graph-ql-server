"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
// products.model.ts
const connections_db_1 = require("../../utils/connections.db");
const sequelize_1 = require("sequelize");
// Product Model
exports.Product = connections_db_1.sequelize.define('products', {
    product_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true, // Added autoIncrement for primary key
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    sale_price: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    discount_percentage: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false,
    },
    image_url: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    image_alt: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: false,
});
