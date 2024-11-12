
import express, { Express } from 'express';
import cookieParser from 'cookie-parser';
// import { PrismaClient } from '@prisma/client';
// import { errorMiddleware } from './middlewares/error';
// import { PORT } from './utils/secret';
// import RootRouter from './routes';
import cors from 'cors';
import morgan from 'morgan'
// import path from 'path';

const PORT = process.env.PORT || 5000;

const app: Express = express();
app.use(morgan('tiny'));

// Middleware 
app.use(express.json());
// app.use(cors())
// app.use(cors({
//     origin: 'http://localhost:5173', // Replace with your frontend URL
//     methods: 'GET,POST,PUT,PATCH,DELETE',
//     credentials: true, // Enable cookies and credentials
// }));

// Static folder to serve uploaded images
// app.use('/uploads', express.static(path.join(__dirname, './uploads')));

app.use(cookieParser());
// app.use(errorMiddleware);
// app.use('/api', RootRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})