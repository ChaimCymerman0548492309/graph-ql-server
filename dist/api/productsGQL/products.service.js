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
const connections_db_1 = require("../../utils/connections.db");
const queriesDB_1 = require("./queriesDB");
const productService = {
    getAllInventory: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const inventory = yield connections_db_1.sequelize.query(queriesDB_1.selectAllProducts);
            return inventory[0];
        }
        catch (error) {
            console.error('Error fetching inventory:', error);
            throw error;
        }
    }),
    getInventoryById: (productId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const inventoryItem = yield connections_db_1.sequelize.query((0, queriesDB_1.selectProductByIdQuery)(productId));
            console.log(inventoryItem[0][0]);
            return inventoryItem[0][0];
        }
        catch (error) {
            console.error('Error fetching inventory:', error);
            throw error;
        }
    }),
    addNewInventoryItem: (newInventoryItemData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const createdProduct = yield connections_db_1.sequelize.query((0, queriesDB_1.insertProductQuery)(newInventoryItemData));
            return createdProduct[0][0];
        }
        catch (error) {
            console.error('Error creating new inventory item:', error);
            throw new Error('Error creating new inventory item');
        }
    }),
    updateInventoryItem: (productId, product) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const inventoryItem = yield connections_db_1.sequelize.query((0, queriesDB_1.updateProductQuery)(productId, product));
            return inventoryItem[0][0];
        }
        catch (err) {
            throw new Error(err + ": Error updating inventory item");
        }
    }),
    deleteInventoryItem: (productId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const inventoryItem = yield connections_db_1.sequelize.query((0, queriesDB_1.deleteProductQuery)(productId));
            if (inventoryItem) {
                return { success: true, message: 'Inventory item deleted successfully !' };
            }
            return { success: false, message: 'Error while deleting inventory item !' };
        }
        catch (error) {
            console.error('Error deleting inventory item:', error);
            throw new Error('Error deleting inventory item');
        }
    }),
};
exports.default = productService;
