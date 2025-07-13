import usermodel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';
import transactionModel from "../models/transactionModel.js";
import razorpay from "razorpay"

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: 'Please fill all fields' });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ success: false, message: 'Invalid email format' });
        }
        if (password.length < 8) {
            return res.status(400).json({ success: false, message: 'Password must be at least 8 characters long' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(password, salt);

        const userData = {
            name,
            email,
            password: hashedpassword,
        }

        const newUser = new usermodel(userData);
        const user = await newUser.save()
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        res.status(201).json({success:true, token, user:{name:user.name}})
    } catch (error) {
        console.log('Error in registerUser controller:', error);
        res.status(500).json({ success: false, message: error.message || 'Internal server error' });
        
    }
}


const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await usermodel.findOne({email})

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
            res.status(200).json({ success: true, token, user: { name: user.name } });
        }else{
            return res.status(400).json({ success: false, message: 'Invalid credentials' });
        }

    } catch (error) {
        console.log('Error in loginUser controller:', error);
        res.status(500).json({ success: false, message: error.message || 'Internal server error' });
    }
}


const userCredits = async (req, res) => {
    try {
        const userId = req.userId;

        const user = await usermodel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({
            success: true,
            credits : user.creditBalance,
            user: { name: user.name }
        });

    } catch (error) {
        console.log('Error in userCredits controller:', error);
        res.status(500).json({ success: false, message: error.message || 'Internal server error' });
    }
};


const razorpayInstance = new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})

const paymentrazorpay = async(req, res) => {
    try {
        
        const {userId, planId} =req.body
        const userData = await usermodel.findById(userId)

        if(!userData || !planId){
            return res.status(400).json({ success: false, message: 'Please fill all fields' });
        }

        let credits, plan, amount, date

        switch (planId) {
            case 'Basic':
                plan= 'Basic'
                credits=15
                amount=10
                break;
            case 'Advanced':
                plan= 'Advanced'
                credits=70
                amount=30
                break;
            case 'Premier':
                plan= 'Premier'
                credits=150
                amount=55
                break;
        
            default:
                return res.status(404).json({success:false, message:'Plan not found'});
        }

        date = Date.now()

        const transactionData = {
            userId, plan, amount, credits, date
        }

        const newTransaction = await transactionModel.create(transactionData)

        const options = {
            amount:amount*100,
            currency:process.env.CURRENCY,
            receipt:newTransaction.key_id
        }

        await razorpayInstance.orders.create(options,(error, order) => {
            if (error) {
                console.log(error)
                return res.status(404).json({success:false, message:error})
            }
                return res.status(200).json({success:true,order})
        })

    } catch (error) {
        console.log(error);
            return res.status(404).json({success:false, message:error.message})
    }
}


const verifyRazorpay = async(req, res) => {
    try {
        
        const {razorpay_order_id} = req.body
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)

        if (orderInfo.status == "paid") {
            const transactionData = await transactionModel.findById(orderInfo.receipt)
            if (transactionData.payment) {
                return res.status(404).json({success:false, message:'Payment Failed'})
            }

            const userData= await usermodel.findById(transactionData.userId)

            const creditBalance = userData.creditBalance + transactionData.credits
            await usermodel.findByIdAndUpdate(userData._id, { creditBalance });
            await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true });
                return res.status(200).json({success:true, message:'Credit Added'})
        }
        else{
            res.status(404).json({ success: false, message: 'Payment Failed' })
        }

    } catch (error) {
        console.log(error);
            return res.status(404).json({success:false, message:error.message}) 
    }
}


export{registerUser, loginUser, userCredits, paymentrazorpay, verifyRazorpay};
