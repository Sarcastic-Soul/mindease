import { Schema } from "mongoose";

const TaskRecordSchema = new Schema({
    date: {
        type: Date,
        required: [true, 'Date is required'],
        index: true,
    },
    completedTasks: {
        type: Number,
        default: 0,
        min: [0, 'Completed tasks cannot be negative'],
    },
});

export default TaskRecordSchema;