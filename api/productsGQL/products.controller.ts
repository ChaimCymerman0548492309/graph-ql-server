import { Request, Response } from 'express';
import productService from './products.service';


export const getAllInventory = async () => {
    try {
        const inventory = await productService.getAllInventory();                
        return {
            status: 200,
            products: inventory
        }

    } catch (error) {
        console.error('Error fetching inventory:', error);
        return {
            status: 500,
            message: 'Internal Server Error'
        }
    }
};

export const getInventoryById = async (productId: string) => {
    try {
        const inventoryItem = await productService.getInventoryById(productId);
        if (inventoryItem) {
            return {
                status: 200,
                product: inventoryItem,
                message: 'Inventory has been successfully'
            }
        } else {
            return {
                status: 404,
                message: 'Inventory item not found!'
            }

        }
    } catch (error) {
        return {
            status: 500,
            message: 'Internal Server Error'
        }
    }
};

export const addNewInventoryItem = async (req: Request, res: Response): Promise<void> => {
    const newInventoryItemData = req.body;

    try {
        const createdInventoryItem = await productService.addNewInventoryItem(newInventoryItemData);
        res.status(201).json(createdInventoryItem);

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const updateInventoryItem = async (req: Request, res: Response): Promise<void> => {
    const productId = req.params.productId;
    const updatedInventoryItemData = req.body
    
    try {
        const updatedInventoryItem = await productService.updateInventoryItem(productId, updatedInventoryItemData.amount);
        if (updatedInventoryItem) {
            res.status(200).json(updatedInventoryItem);
        } else {
            res.status(404).json({ message: 'Inventory item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const deleteInventoryItem = async (req: Request, res: Response): Promise<void> => {
    const productId = req.params.productId;

    try {
        const deletedInventoryItem = await productService.deleteInventoryItem(productId);
        if (deletedInventoryItem) {
            res.status(200).json(deletedInventoryItem);
        } else {
            res.status(404).json({ message: 'Inventory item not found' });

        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

