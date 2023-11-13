import express from 'express';
import { getAllUsers, signup, login } from '../controllers/user_controller';

const router = express.Router();
router.get('/', getAllUsers);
router.post("/signup", signup);
router.post("/login", login);
export default router;