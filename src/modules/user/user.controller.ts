import { Request, Response } from "express";
import { createUserService, updateUserService, deleteUserService, userListService } from "./user.services";

// USER LIST CONTROLLER
export const userList = async (req: Request, res: Response) => {
  try {
    const users = await userListService(req.query);

    if(!users) {
        res.status(404).json({ error: 'No users found' });
    };

    res.status(200).json({
        success: true,
        message: 'User list retrieved successfully', 
        data: users,
    });
  } catch (error: unknown) {
    res.status(500).json({ error: (error as { message?: string }).message || 'Internal server error' });
  }
};

// CREATE USER CONTROLLER
export const createUser = async (req: Request, res: Response) => {
  try {
    const userData = await createUserService(req.body);

    if (!userData) {
      return res.status(400).json({ error: 'User creation failed' });
    }

    res.status(201).json({
        success: true,
        message: 'User created successfully', 
        data: userData,
    });
  } catch (error: unknown) {
    res.status(500).json({ error: (error as { message?: string }).message || 'Internal server error' });
  }
};

// UPDATE USER CONTROLLER
export const updateUser = async (req: Request, res: Response) => {
    try {
      const userId = req.params._id as string;
      const userData = await updateUserService(userId, req.body);
  
      if (!userData) {
        return res.status(400).json({ error: 'User update failed' });
      };

      res.status(200).json({
          success: true,
          message: 'User updated successfully', 
          data: userData,
      });
    } catch (error: unknown) {
        res.status(500).json({ error: (error as { message?: string }).message || 'Internal server error' });
    }
};

// DELETE USER CONTROLLER
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const userId = req.params._id as string;
        const deleteData = await deleteUserService(userId);

        if (!deleteData) {
            return res.status(400).json({ error: 'User deletion failed' });
        }
        res.status(200).json({
            success: true,
            message: 'User deleted successfully', 
        });
    } catch (error: unknown) {
        res.status(500).json({ error: (error as { message?: string }).message || 'Internal server error' });
    };
};