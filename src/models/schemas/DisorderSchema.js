import { Schema } from "mongoose";

const DisorderSchema = new Schema({
    disorderName: {
        type: String,
        enum: {
            values: ['Depression', 'Bipolar', 'PTSD', 'ADHD', 'Schizophrenia', 'Eating Disorder'],
            message: '{VALUE} is not a supported disorder type',
        },
        required: [true, 'Disorder name is required'],
        index: true,
    },
    severity: {
        type: Number,
        min: [1, 'Severity must be at least 1'],
        max: [10, 'Severity cannot exceed 10'],
        default: null,
    },
    diagnosisDate: {
        type: Date,
        default: Date.now,
        validate: {
            validator: function (date) {
                return date <= new Date();
            },
            message: 'Diagnosis date cannot be in the future',
        },
    }
});

export default DisorderSchema;