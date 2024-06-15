
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    account: {
        type:Number,
        required:true,
        unique: true
    },
        name: {
            type:String,
            required:true
        },
        email: {
            type: String,
            required:true,
            unique: true
           
        },
        department: {
            type:String,
            required:true
        },
        contact: {
            type:Number,
            required:true
        },
});

const users = new mongoose.model("users", userSchema);

module.exports = users;