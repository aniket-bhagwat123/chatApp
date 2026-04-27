import User from "./user.model";
import bcrypt from 'bcryptjs';
import { IUser } from "./user.interface";
import { generateJwtToken } from "../../utils/generateJwtToken";

// CREATE USER SERVICE
export const createUserService = async (userData: IUser) => {
    const { email, password, name } = userData;

    if (!email || !password) {
        throw new Error('Email and password are required');
    };

    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error('Email already exists');
    };

    const SALT = 10;
    const hashedPassword = await bcrypt.hash(password, SALT);

    const data = await User.create({ name, email, password: hashedPassword });
    return data;
};

// LOGIN USER SERVICE
export const loginUserService = async (userData: IUser) => {
    const { email, password } = userData;

    const userLogin = await User.findOne({ email });

    if (!userLogin) {
        throw new Error('Invalid email or password');
    };

    const isMatch = await bcrypt.compare(password, userLogin.password);

    if (!isMatch) {
        throw new Error('Invalid email or password');
    };

    const accessToken = generateJwtToken(userLogin._id.toString());

    return { userLogin, accessToken };
};

// USER UPDATE SERVICE
export const updateUserService = async (userId: string, userData: Partial<IUser>) => {
    const { name, email, password } = userData;

    const updateData = await User.findByIdAndUpdate(
        userId, 
        { name, email, password }, 
        { new: true }
    );

    if (!updateData) {
        throw new Error('User update failed');
    };
    
    return updateData;
};

// USER DELETE SERVICE
export const deleteUserService = async (userId: string) => {
    const deleteData = await User.findByIdAndDelete(userId);

    if (!deleteData) {
        throw new Error('User deletion failed');
    };

    return deleteData;
};