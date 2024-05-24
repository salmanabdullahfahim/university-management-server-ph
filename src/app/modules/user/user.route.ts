import express from 'express';
import app from '../../../app';
import { UserControllers } from './user.controller';

const router = express.Router();

app.post('create-student', UserControllers.createStudent);

export const userRoutes = router;
