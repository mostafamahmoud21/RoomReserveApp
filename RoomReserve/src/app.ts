import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

//import { userRouter } from './routes/users.Router';
import { authRouter } from './routes/auth.Router';
import { roomRouter } from './routes/room.Router';

const app = express();

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello, World!');
});

//app.use('/api/users', userRouter)
app.use('/api/auth', authRouter)
app.use('/api',roomRouter)

app.listen(3000, () => {
    console.log('Server running on port 3000...');
});
