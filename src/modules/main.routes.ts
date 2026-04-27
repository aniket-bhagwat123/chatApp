import express from 'express';
import userRoutes from './user/user.routes';
import authRoutes from './auth/auth.routes';

const router = express.Router();

router.use('/', authRoutes);
router.use('/users', userRoutes);

export default router;