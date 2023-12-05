import * as usersController from './users.controller'
import { User } from './users.interface';


export const usersResolvers = {

  Query : {
    
  },
  
  Mutation: {
    loginUser: async (_: any, { user }: { user: User }) => {
      const result = await usersController.loginUser(user);
      return result;
    },

    register: async (_: any, { user }: { user: User }) => {
      try {
        const result = await usersController.registerUser(user);

        if (result.status !== 201) {
          throw new Error(result.message);
        }
        console.log(result);

        return result
      } catch (error) {
        return error
      }
    },
  },
};
