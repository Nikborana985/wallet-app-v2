import express from 'express';
import { 
  accountController, 
  transactionController, 
  budgetController, 
  investmentController,
  categoryController,
  subcategoryController
} from '../controllers';

const router = express.Router();

// Account routes
router.post('/accounts', accountController.create);
router.get('/accounts', accountController.getAll);
router.put('/accounts/:id', accountController.update);
router.delete('/accounts/:id', accountController.delete);

// Transaction routes
router.post('/transactions', transactionController.create);
router.get('/transactions', transactionController.getAll);
router.put('/transactions/:id', transactionController.update);
router.delete('/transactions/:id', transactionController.delete);

// Budget routes
router.post('/budgets', budgetController.create);
router.get('/budgets', budgetController.getAll);
router.put('/budgets/:id', budgetController.update);

// Category routes
router.post('/categories', categoryController.create);
router.get('/categories', categoryController.getAll);

// Subcategory routes
router.post('/subcategories', subcategoryController.create);
router.get('/subcategories', subcategoryController.getAll);

// Investment routes
router.post('/investments', investmentController.create);
router.get('/investments', investmentController.getAll);
router.put('/investments/:id', investmentController.update);
router.delete('/investments/:id', investmentController.delete);

export default router;