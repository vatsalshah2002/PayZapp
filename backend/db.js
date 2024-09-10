// backend/db.js
const mongoose = require('mongoose');

//mongoose.connect("mongodb+srv://vatsals5:20022002@cluster0.a8dao.mongodb.net/");
const dbURI = "mongodb+srv://vatsals5:20022002@cluster0.a8dao.mongodb.net/";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Connection events
const db = mongoose.connection;

db.on('connected', () => {
    console.log('Mongoose connected to the database');
});

db.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

db.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

// Handle process termination gracefully
process.on('SIGINT', async () => {
    await mongoose.connection.close();
    console.log('Mongoose connection closed due to app termination');
    process.exit(0);
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
       
        
    },
    password: {
        type: String,
        required: true,
        
    },
    firstName: {
        type: String,
        required: true,
    
    },
    lastName: {
        type: String,
        required: true,
        
    }
});

// Create a model from the schema
const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, // Reference to User model
        ref: 'User',
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

const Account = mongoose.model('Account', accountSchema);

const User = mongoose.model('User', userSchema);

module.exports = {
	User,
    Account,
    db
};