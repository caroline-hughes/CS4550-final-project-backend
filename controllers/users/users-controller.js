import * as usersDao from './users-dao.js'

const findUsers = async (req, res) => {
  const users = await usersDao.findUsers()
  console.log('GETting all users...')
  res.json(users);
}

const createUser = async (req, res) => {
  const newUser = req.body;
  console.log('\n\n NEW USER TO ADD:')
  console.log(newUser)
  const insertedTuit = await usersDao.createUser(newUser);
  res.json(insertedTuit);
}

const deleteUser = async (req, res) => {
  const userToDelete = req.params.tid;
  const status = await usersDao.deleteUser(userToDelete);
  res.json(status);
}

const updateUser = async (req, res) => {
  const userToUpdate = req.params.tid;
  const updates = req.body;
  const status = await usersDao.updateUser(userToUpdate, updates);
  res.json(status);
}

export default (app) => {
 app.post('/users', createUser);
 app.get('/users', findUsers);
 app.put('/users/:uid', updateUser);
 app.delete('/users/:uid', deleteUser);
}
