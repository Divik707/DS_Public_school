import mongoose from "mongoose";

export async function connect() {
    await mongoose.connect(process.env.MONGO_DB_CONNECT as string).then(() => {
        console.log('MongoDB connected !!')
    })
    const connection = mongoose.connection;
    connection.on('error', (err) => {
        console.error(err);
        process.exit();
    }
    );
}