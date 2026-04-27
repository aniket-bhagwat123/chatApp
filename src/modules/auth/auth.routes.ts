import express from "express";
import { loginUser, signUser } from './auth.controller';

const router = express.Router();

router.post('/login', loginUser);
router.post('/signup', signUser);

export default router;