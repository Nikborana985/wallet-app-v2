import express from 'express';
import { createTransaction, getTransactions, createAccount, getAccounts } from '../controllers/index';

const router = express.Router();

// Transaction routes
router.post('/transactions', createTransaction);
router.get('/transactions', getTransactions);

// Account routes
router.post('/accounts', createAccount);
router.get('/accounts', getAccounts);

export default router;