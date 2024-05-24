import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { StudentRoutes } from './app/modules/student/student.route';
import { userRoutes } from './app/modules/user/user.route';
import globalErrorHandler from './app/middleware/globarErrorHandler';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());

//routes
app.use('/api/v1/students', StudentRoutes);
app.use('/api/v1/users', userRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

// error handler
app.use(globalErrorHandler);

export default app;
