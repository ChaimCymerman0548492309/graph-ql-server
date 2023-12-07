import * as productsController from "../productsGQL/products.controller";
import { AdminProductInterface } from "./products.interface";

export const productsResolvers = {
  Query: {
    getProducts: async () => {
      try {
        const result = await productsController.getAllInventory();
        return result;
      } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
      }
    },

    getProductById: async (_: any, { id }: { id: string }) => {
      try {
        const result = await productsController.getInventoryById(id);
        
        return result
      } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
      }

    }
  },
  Mutation: {

    addProduct: async (_: any, { product }: { product: AdminProductInterface }) => {
      try {

        const result = await productsController.addNewInventoryItem(product);

        return result
      } catch (error) {
        throw error;
      }
    },

    updateProduct: async (_: any, { id, product }: { id: string, product: AdminProductInterface }) => {
      try {

      const result = await productsController.updateInventoryItem(id, product);

        return result
      } catch (error) {
        throw error;
      }
    },

    deleteProduct: async (_: any, {id}: {id: string}) => {
      try {
        const result = await productsController.deleteInventoryItem(id);

        return result;
      } catch (error) {
        throw error;
      }
    }
  }
}


