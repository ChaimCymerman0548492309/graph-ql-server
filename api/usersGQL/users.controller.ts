import jwt from 'jsonwebtoken';
import * as userService from './users.service';
import { User } from './users.interface';

const secretKey = process.env.SECRET_KEY;

const generateToken = (userId: string | undefined) => {
  return jwt.sign({ userId }, secretKey!, { expiresIn: '3h' });
};

export const loginUser = async (loginUser: User) => {
  try {
    const userFromDb = await userService.loginUser(loginUser);
    if (userFromDb.status === 200) {
      const token = generateToken(userFromDb.user!.userId);     
      const tokenString = token.toString();  
      return {
        status: userFromDb.status,
        token: tokenString, 
      };
    } else {
      return {
        status: userFromDb.status,
        message: userFromDb.content,
      };
    }
  } catch (err) {
    console.error(err);
    return {
      status: 500,
      message: 'Internal Server Error',
    };
  }
};


export const registerUser = async (user: User) => {
  try {
    const userCreationResult = await userService.registerUser(user);

    if (userCreationResult.status === 201) {
      return {
        status: userCreationResult.status,
        user: userCreationResult.user,
        message: userCreationResult.message
      }
    } else {
      return {
        status: userCreationResult.status,
        message: userCreationResult.message
      }
    }
  } catch (error) {
    console.error('An error occurred while processing the request:', error);
    return {
      status: 500,
      message: 'An error occurred while processing the request',
    }
  }
};