import * as userDao from './users-dao.js'

let currentUser = null

const UsersController = (app) => {

  const findAllUsers = async (req, res) => {
    const users = await userDao.findAllUsers()
    res.json(users)
  }

  const findUserById = async (req, res) => {
    const uid = req.params.uid
    const user = await userDao.findByID(uid)
    if (user) {
        res.json(user)
        return
    }
    res.sendStatus(404)
  } 

  const createUser = async (req, res) => {
    const newUser = req.body;
    console.log('\n\n NEW USER TO ADD:')
    console.log(newUser)
    const insertedUser = await userDao.createUser(newUser);
    res.json(insertedUser);
  }

  const deleteUser = async (req, res) => {
    const userToDelete = req.params.uid;
    const status = await userDao.deleteUser(userToDelete);
    res.json(status);
  }

  const updateUser = async (req, res) => {
    const userToUpdate = req.params.uid;
    const updates = req.body;
    const status = await userDao.updateUser(userToUpdate, updates);
    res.json(status);
  }

  const register = async (req, res) => {
    const user = req.body;
    const existingUser = await userDao.findByUsername(user.username)
    if (Object.keys(existingUser).length !== 0) {
        console.log('cannot register user, username already exists')
        res.sendStatus(403)
        return
    }
    const currentUser = await userDao.createUser(user)
    //req.session['currentUser'] = currentUser
    res.json(currentUser)
  }

  const login = async (req, res) => {
    const credentials = req.body
    console.log('credentials=', credentials)
    const existingUser = await userDao
        .findByCredentials(
            credentials.username, credentials.password)
    if (existingUser.length > 0) {
        console.log('\nsuccess. the current user is: ', existingUser)
        res.json(existingUser)
    } else {
      console.log('invalid credentials', credentials)
      res.sendStatus(403)
    }
}

  const logout = (req, res) => {
    req.session.destroy()
    res.sendStatus(200)
  }

  const my_profile = (req, res) => {
    if (req.session['currentUser']) {
        res.send(req.session['currentUser'])
    } else {
        res.sendStatus(403)
    }
  }

  const other_profile = (req, res) => {
    const uid = req.params.uid;
    // TODO
  }

  const getRecentActivity = async (req, res) => {
    const uid = req.params.uid;
    console.log('hit /recent/' + String(uid))
    }

  const getAnonRecentActivity = async (req, res) => {
    console.log('hit /recent')
    const usersByDateJoined = await userDao.findAllUsersByDateJoined()
    console.log('most recent 3 people to join:', usersByDateJoined)
    res.json(usersByDateJoined)
  } 

  app.get('/users', findAllUsers); 
  app.get('/users/:uid', findUserById); 
  app.post('/users', createUser);
  app.put('/users/:uid', updateUser);
  app.delete('/users/:uid', deleteUser);

  app.post('/register', register)
  app.post('/login', login)
  app.post('/logout', logout)
  app.post('/profile', my_profile) // profile of current user
  app.post('/profile/:uid', other_profile) // profile of a different user

  app.get('/recent', getAnonRecentActivity); 
  app.get('/recent/:uid', getRecentActivity); 
} 

export default UsersController