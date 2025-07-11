import express from 'express';
import { registerUser, loginUser, userCredits} from '../controllers/user.js';
import authUser from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/credits', authUser, userCredits);



export default userRouter;