import * as productsController from "../productsGQL/products.controller";

export const productsResolvers = {
    Query: {
        getProducts: async () => {
          try {
            // Fetch products from the database or any data source
            const products = await productsController.getAllInventory()
      
            // Return the result with the appropriate fields
            return {
              message: 'Products fetched successfully',
              products,
              status: 200,
            };
          } catch (error) {
            console.error('Error fetching products:', error);
            return {
              message: 'Internal Server Error',
              products: null,
              status: 500,
            };
          }
        },
      }
      
}
