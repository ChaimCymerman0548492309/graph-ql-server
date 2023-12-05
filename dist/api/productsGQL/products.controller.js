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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteInventoryItem = exports.updateInventoryItem = exports.addNewInventoryItem = exports.getInventoryById = exports.getAllInventory = void 0;
const products_service_1 = __importDefault(require("./products.service"));
const getAllInventory = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inventory = yield products_service_1.default.getAllInventory();
        return {
            status: 200,
            products: inventory
        };
    }
    catch (error) {
        console.error('Error fetching inventory:', error);
        return {
            status: 500,
            message: 'Internal Server Error'
        };
    }
});
exports.getAllInventory = getAllInventory;
const getInventoryById = (productId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const inventoryItem = yield products_service_1.default.getInventoryById(productId);
        if (inventoryItem) {
            return {
                status: 200,
                product: inventoryItem,
                message: 'Inventory has been successfully'
            };
        }
        else {
            return {
                status: 404,
                message: 'Inventory item not found!'
            };
        }
    }
    catch (error) {
        return {
            status: 500,
            message: 'Internal Server Error'
        };
    }
});
exports.getInventoryById = getInventoryById;
const addNewInventoryItem = (newInventoryItemData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdInventoryItem = yield products_service_1.default.addNewInventoryItem(newInventoryItemData);
        return {
            status: 201,
            product: createdInventoryItem.product,
            adminProduct: createdInventoryItem.adminProduct,
            message: 'Successfully added!'
        };
    }
    catch (error) {
        return {
            status: 500,
            message: 'Intrnal service error'
        };
    }
});
exports.addNewInventoryItem = addNewInventoryItem;
const updateInventoryItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    const updatedInventoryItemData = req.body;
    try {
        const updatedInventoryItem = yield products_service_1.default.updateInventoryItem(productId, updatedInventoryItemData.amount);
        if (updatedInventoryItem) {
            res.status(200).json(updatedInventoryItem);
        }
        else {
            res.status(404).json({ message: 'Inventory item not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.updateInventoryItem = updateInventoryItem;
const deleteInventoryItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const productId = req.params.productId;
    try {
        const deletedInventoryItem = yield products_service_1.default.deleteInventoryItem(productId);
        if (deletedInventoryItem) {
            res.status(200).json(deletedInventoryItem);
        }
        else {
            res.status(404).json({ message: 'Inventory item not found' });
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});
exports.deleteInventoryItem = deleteInventoryItem;
const exampleAdminProduct = {
    product: {
        name: 'Example Admin Product',
        sale_price: 39.99,
        quantity: 50,
        description: 'This is an example admin product description.',
        category: 'Office Supplies',
        discount_percentage: 15,
        image_url: 'https://example.com/admin-product-image.jpg',
        image_alt: 'Example Admin Product Image Alt',
    },
    Admin_Products: {
        is_for_sale: true,
        cost_price: 29.99,
        supplier: 'Admin Supplier Inc.',
    }
};
