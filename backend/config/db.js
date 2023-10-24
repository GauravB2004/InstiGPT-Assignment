const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://cdab89565:bFHEL9zHU4r9NY5E@cluster0.etjapiz.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('MongoDB connected...');
    } catch (err) {
        console.error(err.message);
        console.log("Error connecting to MongoDB");
        process.exit(1);
    }
}

module.exports = connectDB;
