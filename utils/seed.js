const connection = require('../config/connection');
const { User, Thought } = require('../models');

const users = []; 

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

// Drop existing users
await User.deleteMany({});

// Drop existing thoughts
await Thought.deleteMany({});

//uh empty array for users I THINK THIS IS RIGHT ????



 // Add students to the collection and await the results
 await User.collection.insertMany(users);
});