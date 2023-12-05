"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_model_1 = require("./products.model");
const sequelize_1 = require("sequelize");
const productService = {
    getAllProducts: () => __awaiter(void 0, void 0, void 0, function* () {
        const products = yield products_model_1.Product.findAll();
        return products.map((product) => product.toJSON());
    }),
    getProductById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const product = yield products_model_1.Product.findOne({ where: { product_id: id } });
        return product ? product.toJSON() : null;
    }),
    updateProductQuantity: (id, amount) => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield products_model_1.Product.update({ quantity: sequelize_1.Sequelize.literal(`quantity - ${amount}`) }, { where: { product_id: id } });
        if (result[0] === 0) {
            return "Product not found!";
        }
        return result[0];
    }),
};
exports.default = productService;
