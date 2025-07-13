import express from 'express';
import { registerUser, loginUser, userCredits, paymentrazorpay, verifyRazorpay} from '../controllers/user.js';
import authUser from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/credits', authUser, userCredits);
userRouter.post('/pay-razor', authUser, paymentrazorpay)
userRouter.post('/verify-razor', verifyRazorpay)




export default userRouter;