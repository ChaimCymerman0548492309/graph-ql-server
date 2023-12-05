"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeDefs = `#graphql
    type Product {
        product_id: ID
        name: String!
        sale_price: Float!
        quantity: Int!
        description: String!
        category: String!
        discount_percentage: Float!
        image_url: String!
        image_alt: String!
        is_for_sale: Boolean!
        cost_price: Float!
        supplier: String!
    }

    type getProductsResult {
        message: String
        products: [Product]
        status: Int
    }

`;
const typesQuery = `#graphql
    type Query {
        getProducts: getProductsResult
    }
`;
const productsTypes = typeDefs + typesQuery;
exports.default = productsTypes;
