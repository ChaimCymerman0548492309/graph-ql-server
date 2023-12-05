import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { merge } from 'lodash'

import dotenv from 'dotenv';
dotenv.config()

import { connectToDatabase } from './utils/connections.db';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

import productsTypes from './api/productsGQL/productsTypes';
import { productsResolvers } from './api/productsGQL/products.resolvers';

import usersTypes from './api/usersGQL/usersTypes';
import { usersResolvers } from './api/usersGQL/users.reslovers';

export const app = express();

app.use(cors({ origin: '*' }));

app.use(morgan('dev'));

app.use(express.json({ limit: '50mb' }));


// app.use('/products', productRouter);

(async () => {
    const server = new ApolloServer({
        typeDefs: usersTypes + productsTypes,
        resolvers: merge(usersResolvers, productsResolvers)
    });
    await connectToDatabase()

    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });

    console.log(`🚀  Server ready at: ${url}`);
})();
