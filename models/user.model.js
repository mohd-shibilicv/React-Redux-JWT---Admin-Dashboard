import mongoose from 'mongoose';

const userSceheme = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePicture: {
        type: String,
        default: "https://th.bing.com/th/id/OIP.LONeYx52kcHaTmfxhp0dSgHaF2?w=210&h=180&c=7&r=0&o=5&pid=1.7",
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isActive: {
        type: Boolean,
        default: true,
    }
}, {timestamps: true});

const User = mongoose.model('User', userSceheme);

export default User;