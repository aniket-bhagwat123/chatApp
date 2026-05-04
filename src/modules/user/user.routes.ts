import express from 'express';
import { createUser, updateUser, deleteUser, userList } from './user.controller';
import { tokenMiddleware } from '../../utils/token.middleware';

const router = express.Router();

router.get('/', tokenMiddleware, userList);
router.post('/', tokenMiddleware , createUser);
router.patch('/:_id', tokenMiddleware , updateUser);
router.delete('/:_id', tokenMiddleware , deleteUser);

export default router;