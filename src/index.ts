
import express, { Express, Request, Response } from 'express';
import cookieParser from 'cookie-parser';
// import { PrismaClient } from '@prisma/client';
// import { PORT } from './utils/secret';
import RootRouter from './routes';
import cors from 'cors';
import morgan from 'morgan'
import { errorMiddleware } from './middlewars/error';
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
app.use(errorMiddleware);
app.use('/api', RootRouter)

// Test API endpoints
app.get('/', (req: Request, res: Response) => {
    res.json({ message: 'API is working!' });
});

app.post('/api/echo', (req: Request, res: Response) => {
    const body = req.body;
    res.json({ 
        message: 'Echo endpoint',
        receivedData: body 
    });
});

app.get('/api/hello/:name', (req: Request, res: Response) => {
    const name = req.params.name;
    res.json({ message: `Hello, ${name}!` });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})