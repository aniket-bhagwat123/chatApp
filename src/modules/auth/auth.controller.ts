import { Request, Response } from 'express';
import { createUserService, loginUserService } from '../user/user.services';

// LOGIN USER CONTROLLER
export const loginUser = async (req: Request, res: Response) => {
  try {
    const LoginData = await loginUserService(req.body);

    if (!LoginData) {
      return res.status(400).json({ error: 'Login failed' });
    };

    res.status(200).json({
        success: true,
        message: 'Login successful', 
        data: LoginData.userLogin,
        accessToken: LoginData.accessToken
    });
  } catch (error: unknown) {
    res.status(500).json({ error: (error as { message?: string }).message || 'Internal server error' });
  }
};

// SIGNUP USER CONTROLLER
export const signUser = async (req: Request, res: Response) => {
    try {
        const userData = await createUserService(req.body);

        if (!userData) {
            return res.status(400).json({ error: 'User creation failed' });
        };

        res.status(201).json({
            success: true,
            message: 'User created successfully', 
            data: userData,
        });
    } catch (error: unknown) {
        res.status(500).json({ error: (error as { message?: string }).message || 'Internal server error' });
    }
};