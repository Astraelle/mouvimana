import express from 'express';
import { signUp, signIn, getUser } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/signup', signUp);
userRouter.post('/signin', signIn);
userRouter.get('/getuser', getUser);

export default userRouter;