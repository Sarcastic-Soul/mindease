import { Schema } from "mongoose";

const TaskSchema = new Schema({
    taskID: {
        type: String,
        trim: true,
        sparse: true, // Ensures the unique index only applies to non-null values
        unique: true,
    },

    title: {
        type: String,
        required: [true, 'Task title is required'],
        trim: true,
        minlength: [3, 'Title must be at least 3 characters long'],
        maxlength: [100, 'Title cannot exceed 100 characters'],
    },
    isCompleted: {
        type: Boolean,
        default: false,
        index: true,
    },
    date: {
        type: Date,
        required: [true, 'Task date is required'],
        index: true,
    },
}, {
    timestamps: true,
});
export default TaskSchema;