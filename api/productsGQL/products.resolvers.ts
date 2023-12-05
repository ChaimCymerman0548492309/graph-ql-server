import * as productsController from "../productsGQL/products.controller";

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
  },
};


