import {ApolloServer} from '@apollo/server';
import http from 'http';
import mongoose from 'mongoose';
import {expressMiddleware} from '@apollo/server/express4';
import {ApolloServerPluginDrainHttpServer} from '@apollo/server/plugin/drainHttpServer';
import typeDefs from './schemas/typeDefs';
import express from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import body_parser_pkg from 'body-parser';
import Query from './resolvers/query';
import Mutation from './resolvers/mutation';
import Order from './resolvers/order';
import Review from './resolvers/review';
import Shirts from './resolvers/shirts';
import ShirtOrderLine from './resolvers/shirtOrderLine';
const {json} = body_parser_pkg;
import jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';

dotenv.config({ path: './config.env' });

interface MyContext {
    user: string | JwtPayload | undefined;
  }

const resolvers = {
    Query,
    Mutation,
    Order,
    Review,
    Shirts,
    ShirtOrderLine
};

const app = express();

const httpServer = http.createServer(app);

const server = new ApolloServer<MyContext>({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({httpServer})],
})

await server.start();

app.use('/graphql',
    cors<cors.CorsRequest>(),
    json(),
    expressMiddleware(server, {
        context: async({req, res}) => {
             const token = req.headers.authorization || ''
             const user = await getUser(token)
             return {user}
            }
        },
    )
);


app.use(cors())

await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 GraphQL Server ready at http://localhost:4000/graphql`);

  const DB_URI = process.env.DB_URI;
  if (DB_URI) {
    mongoose.connect(DB_URI).then(() => console.log('DB connection successful!'));
  } else {
    throw new Error('DB_URI is not defined in your environment variables');
  }

const getUser = (token: string) => {
  if (token) {
    try {
      token = token.split(' ')[1];
      const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
      if (JWT_SECRET_KEY) {
        return jwt.verify(token, JWT_SECRET_KEY);
      } else {
        throw new Error('JWT_SECRET_KEY is not defined');
      }
    } catch (err) {
      return { error: true, msg: "Session invalid" };
    }
  }
};