import { findOne, findById, findAll, create, update, remove } from './databaseService.js';
import User from '../models/User.js';
import type UserI from '../types/UserI.js';

const getUserService = async (filter: any) => {
  const user = await findOne(User, filter, {});
  return user;
}

const getUserByIdService = async (id: string) => {
  const user = await findById(User, id, {});
  return user;
}

const getUsersService = async (pagination: { skip: number, limit: number }) => {
  const users = await findAll(User, {}, pagination);
  return users;
}

const createUserService = async (userData: UserI) => {
  const user = new User(userData);
  const userCreated = await create(user);
  return userCreated;
}

const updateUserService = async (userData: UserI) => {
  const user = new User(userData);
  const userUpdated = await update(User, user, {});
  return userUpdated;
}

const removeUserService =  async (id: string) => {
  const user = await remove(User, id, {});
  return user;
}

export { getUserService, getUserByIdService, getUsersService, createUserService, updateUserService, removeUserService };
