import express from 'express';
import cors from 'cors';
import "dotenv/config";
import connectDB from './config/db.js';
import userRouter from './routes/userRoutes.js';
import imageRouter from './routes/imageRoutes.js';

const port = process.env.PORT || 2525;
const app = express();

app.use(express.json());
app.use(cors());
const startServer = async () => {
    await connectDB();
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};


app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)


app.get('/', (req, res) => {
    res.send('API is running...');
});

startServer();