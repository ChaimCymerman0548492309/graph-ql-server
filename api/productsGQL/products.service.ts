import { AdminProductInterface} from './products.interface';
import { sequelize } from '../../utils/connections.db';
import { deleteProductQuery, insertProductQuery, selectAllProducts, selectProductByIdQuery, updateProductQuery } from './queriesDB';

const productService = {
    getAllInventory: async () => {
        try {
            const inventory = await sequelize.query(selectAllProducts)
            return inventory[0]
        } catch (error) {
            console.error('Error fetching inventory:', error);
            throw error;
        }
    },

    getInventoryById: async (productId: string) => {
        try {
            const inventoryItem = await sequelize.query(selectProductByIdQuery(productId))
            console.log(inventoryItem[0][0]);

            return inventoryItem[0][0]
        } catch (error) {
            console.error('Error fetching inventory:', error);
            throw error;
        }
    },


    addNewInventoryItem: async (newInventoryItemData: AdminProductInterface) => {
        try {
            const createdProduct = await sequelize.query(insertProductQuery(newInventoryItemData))
            return createdProduct[0][0]

        } catch (error) {
            console.error('Error creating new inventory item:', error);
            throw new Error('Error creating new inventory item');
        }
    },


    updateInventoryItem: async (productId: string, product: AdminProductInterface) => {

        try {
            const inventoryItem = await sequelize.query(updateProductQuery(productId, product))

            return inventoryItem[0][0]
        } catch (err) {
            throw new Error(err + ": Error updating inventory item")
        }

    },

    deleteInventoryItem: async (productId: string): Promise<{ success: boolean, message?: string }> => {
        try {
            const inventoryItem = await sequelize.query(deleteProductQuery(productId))

            if (inventoryItem) {
                return { success: true, message: 'Inventory item deleted successfully !' };
            }

            return { success: false, message: 'Error while deleting inventory item !' };
        } catch (error) {
            console.error('Error deleting inventory item:', error);
            throw new Error('Error deleting inventory item');
        }
    },

};

export default productService;

