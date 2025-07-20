import { Schema } from "mongoose";
import DisorderSchema from "./DisorderSchema";
import TaskRecordSchema from "./TaskRecordSchema";
import TaskSchema from "./TaskSchema";

const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'Please provide a username'],
        unique: true,
        trim: true,
        minlength: [3, 'Username must be at least 3 characters long'],
        maxlength: [30, 'Username cannot exceed 30 characters'],
        match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers and underscores'],
        index: true,
    },
    email: {
        type: String,
        required: [true, 'Please provide an email'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
            'Please provide a valid email address',
        ],
        index: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide a password'],
        minlength: [8, 'Password must be at least 8 characters long'],
    },
    name: {
        type: String,
        trim: true,
        maxlength: [50, 'Name cannot exceed 50 characters'],
    },
    verifyCode: {
        type: String,
        required: [true, 'Verification code is required'],
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, 'Verification code expiry is required'],
    },
     avatarUrl: {
        type: String,
        default: '',
    },
    isVerified: {
        type: Boolean,
        default: false,
        index: true,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
    mentalDisorders: {
        type: [DisorderSchema],
        default: [],
        validate: {
            validator: function (disorders) {
                const names = new Set(disorders.map(d => d.disorderName));
                return names.size === disorders.length;
            },
            message: 'Duplicate disorders are not allowed',
        },
    },
    currentTasks: {
        type: [TaskSchema],
        default: [],
    },
    taskRecords: {
        type: [TaskRecordSchema],
        default: [],
    },
    streak: {
        type: Number,
        default: 0,
        min: [0, 'Streak cannot be negative'],
    },
    likedPosts: [{
        type: Schema.Types.ObjectId,
        ref: 'posts',
    }],
}, {
    timestamps: true,
});

export default UserSchema;
