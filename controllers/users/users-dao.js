import usersModel from './users-model.js';

export const findAllUsers = () => usersModel.find();

export const findByID = (uid) => usersModel.findOne({_id: uid});
export const findByUsername = (username) => usersModel.find({username})
export const findByCredentials = (username, password) => usersModel.find({username, password})

export const createUser = (user) => usersModel.create(user);

export const deleteUser = (uid) => usersModel.deleteOne({_id: uid});

export const updateUser = (uid, userUpdates) => usersModel.updateOne({_id: uid}, {$set: userUpdates})
