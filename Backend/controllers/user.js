import usermodel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';

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



export{registerUser, loginUser, userCredits};
