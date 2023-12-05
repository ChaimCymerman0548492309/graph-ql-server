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

    type GetProductsResult {
        message: String
        products: [Product]
        status: Int
    }

    type GetProductByIdResult {
        message: String
        status: Int
        product: Product
    }

    input ProductInput {
        product_id: ID
        name: String!
        sale_price: Int!  
        quantity: Int!
        description: String!
        category: String!
        discount_percentage: Int!  
        image_url: String!
        image_alt: String!
    }

    input AdminProductsInput {
        is_for_sale: Boolean!
        cost_price: Int!  
        supplier: String!
    }

    type AdminProduct {
        is_for_sale: Boolean
        cost_price: Int
        supplier: String
        product_id: ID
    }

    input InputNewProduct {
        product: ProductInput
        admin_products: AdminProductsInput
    }

    type AddProductResult {
        message: String
        status: Int
        product: Product
        adminProduct: AdminProduct
    }
`;
const typesQuery = `#graphql
    type Query {
        getProducts: GetProductsResult
        getProductById(id: ID!): GetProductByIdResult
    }

    type Mutation {
        addProduct(product: InputNewProduct): AddProductResult
    }
`;
const productsTypes = typeDefs + typesQuery;
exports.default = productsTypes;
