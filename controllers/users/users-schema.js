import mongoose from 'mongoose';

// const User = mongoose.model('User', userSchema);

const schema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  admin: { type: Boolean, default: false, required: true },
  followers: { type: [String], default: [], required: true }, // list of ids or usernames, not sure which yet
  following: { type: [String], default: [], required: true }, // list of ids or usernames, not sure which yet
  favBreeds: { type: [String], default: [], required: true },
}, {collection: 'users'});

export default schema;