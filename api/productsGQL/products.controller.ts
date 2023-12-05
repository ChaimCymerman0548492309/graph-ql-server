import { Request, Response } from 'express';
import productService from './products.service';
import { AdminProductInterface, InputNewProduct } from './products.interface';


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

export const addNewInventoryItem = async (newInventoryItemData: InputNewProduct) => {
    
    try {
        const createdInventoryItem = await productService.addNewInventoryItem(newInventoryItemData);        
        return {
            status: 201,
            product: createdInventoryItem.product,
            adminProduct: createdInventoryItem.adminProduct,
            message: 'Successfully added!'
        }

    } catch (error) {
        return {
            status: 500,
            message: 'Intrnal service error'
        }
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

const exampleAdminProduct = {
    product : {
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