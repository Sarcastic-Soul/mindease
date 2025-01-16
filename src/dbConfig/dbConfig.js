import mongoose from "mongoose";

export async function connect() {
    if (mongoose.connection.readyState === 1) {
        console.log('MongoDB is already connected.');
        return;
    }

    try {
        await mongoose.connect(process.env.MONGO_URI);

        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB connected.');
        });

        connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
            process.exit(1);
        });
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
    }
}
