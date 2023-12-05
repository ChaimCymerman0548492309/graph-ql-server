import * as productsController from "../productsGQL/products.controller";
import { InputNewProduct } from "./products.interface";

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

    getProductById: async (_:any, {id}: {id: string}) => {
      try{
        const result = await productsController.getInventoryById(id);
        return result
      } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
      }

    }
  },
  Mutation : {
    addProduct: async (_:any, {product}: {product:InputNewProduct}) => {
      try {
        const result = await productsController.addNewInventoryItem(product);
        console.log(result);
        return result
      } catch (error) {
        throw error;
      }
    }
  }
};


