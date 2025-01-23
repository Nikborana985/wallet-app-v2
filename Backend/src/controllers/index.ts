import { Request, Response } from 'express';
import { Account, Transaction, Budget, Investment, Category, Subcategory } from '../models';

// Account Controllers
export const accountController = {
  create: async (req: Request, res: Response) => {
    try {
      const account = new Account(req.body);
      await account.save();
      res.status(201).json(account);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'Unknown error' });
      }
    }
  },

  getAll: async (_req: Request, res: Response) => {
    try {
      const accounts = await Account.find();
      res.status(200).json(accounts);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Unknown error' });
      }
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const account = await Account.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!account) return res.status(404).json({ error: 'Account not found' });
      return res.status(200).json(account);
    } catch (error) {
      if (error instanceof Error) {
        if (error instanceof Error) {
          return res.status(400).json({ error: error.message });
        }
        return res.status(400).json({ error: 'Unknown error' });
      }
      return res.status(400).json({ error: 'Unknown error' });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const account = await Account.findByIdAndDelete(req.params.id);
      if (!account) return res.status(404).json({ error: 'Account not found' });
      return res.status(200).json({ message: 'Account deleted successfully' });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Unknown error' });
    }
  }
};

// Transaction Controllers
export const transactionController = {
  create: async (req: Request, res: Response) => {
    try {
      const transaction = new Transaction(req.body);
      await transaction.save();
      
      // Update account balance
      const account = await Account.findById(transaction.accountId);
      if (account) {
        account.balance += transaction.amount;
        await account.save();
      }

      res.status(201).json(transaction);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'Unknown error' });
      }
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      const { startDate, endDate, accountId, category } = req.query;
      let query: any = {};

      if (startDate) query.date = { $gte: startDate };
      if (endDate) query.date = { ...query.date, $lte: endDate };
      if (accountId) query.accountId = accountId;
      if (category) query.category = category;

      const transactions = await Transaction.find(query);
      res.status(200).json(transactions);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Unknown error' });
      }
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const oldTransaction = await Transaction.findById(req.params.id);
      const newTransaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, { new: true });
      
      if (!newTransaction) return res.status(404).json({ error: 'Transaction not found' });

      // Update account balance
      if (oldTransaction && oldTransaction.accountId === newTransaction.accountId) {
        const account = await Account.findById(newTransaction.accountId);
        if (account) {
          account.balance = account.balance - oldTransaction.amount + newTransaction.amount;
          await account.save();
        }
      }

      return res.status(200).json(newTransaction);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(400).json({ error: 'Unknown error' });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const transaction = await Transaction.findByIdAndDelete(req.params.id);
      if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
      return res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Unknown error' });
    }
  }
};

// Budget Controllers
export const budgetController = {
  create: async (req: Request, res: Response) => {
    try {
      const budget = new Budget(req.body);
      await budget.save();
      res.status(201).json(budget);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'Unknown error' });
      }
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      const { month } = req.query;
      const query = month ? { month } : {};
      const budgets = await Budget.find(query);
      res.status(200).json(budgets);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Unknown error' });
      }
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const budget = await Budget.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!budget) return res.status(404).json({ error: 'Budget not found' });
      return res.status(200).json(budget);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(400).json({ error: 'Unknown error' });
    }
  }
};

// Category and Subcategory Controllers
export const categoryController = {
  create: async (req: Request, res: Response) => {
    try {
      const category = new Category(req.body);
      await category.save();
      res.status(201).json(category);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'Unknown error' });
      }
    }
  },

  getAll: async (_req: Request, res: Response) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Unknown error' });
    }
    }
  }
};

export const subcategoryController = {
  create: async (req: Request, res: Response) => {
    try {
      const subcategory = new Subcategory(req.body);
      await subcategory.save();
      res.status(201).json(subcategory);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'Unknown error' });
      }
    }
  },

  getAll: async (req: Request, res: Response) => {
    try {
      const { category } = req.query;
      const query = category ? { category } : {};
      const subcategories = await Subcategory.find(query);
      res.status(200).json(subcategories);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Unknown error' });
      }
    }
  }
};

// Investment Controllers
export const investmentController = {
  create: async (req: Request, res: Response) => {
    try {
      const investment = new Investment(req.body);
      await investment.save();
      res.status(201).json(investment);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'Unknown error' });
      }
    }
  },

  getAll: async (_req: Request, res: Response) => {
    try {
      const investments = await Investment.find();
      res.status(200).json(investments);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(500).json({ error: 'Unknown error' });
      }
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      const investment = await Investment.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!investment) return res.status(404).json({ error: 'Investment not found' });
      return res.status(200).json(investment);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(400).json({ error: 'Unknown error' });
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      const investment = await Investment.findByIdAndDelete(req.params.id);
      if (!investment) return res.status(404).json({ error: 'Investment not found' });
      return res.status(200).json({ message: 'Investment deleted successfully' });
    } catch (error) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Unknown error' });
    }
  }
};