import { Account, Transaction, Budget, Investment, Category, Subcategory } from '../models';
import mongoose from 'mongoose';

export class AccountService {
  static async getAccountBalances() {
    const accounts = await Account.find();
    return accounts.map(account => ({
      id: account._id,
      name: account.name,
      type: account.type,
      balance: account.balance,
      billGenerationDate: account.billGenerationDate,
      dueDate: account.dueDate,
      reminder: account.reminder
    }));
  }

  static async updateAccountBalance(accountId: string, amount: number) {
    const account = await Account.findById(accountId);
    if (!account) throw new Error('Account not found');
    account.balance += amount;
    return account.save();
  }
}

export class TransactionService {
  static async getTransactions(filters: {
    startDate?: string;
    endDate?: string;
    accountId?: string;
    category?: string;
    minAmount?: number;
    maxAmount?: number;
  }) {
    let query: any = {};

    if (filters.startDate) query.date = { $gte: filters.startDate };
    if (filters.endDate) query.date = { ...query.date, $lte: filters.endDate };
    if (filters.accountId) query.accountId = filters.accountId;
    if (filters.category) query.category = filters.category;
    if (filters.minAmount) query.amount = { $gte: filters.minAmount };
    if (filters.maxAmount) query.amount = { ...query.amount, $lte: filters.maxAmount };

    return Transaction.find(query).sort({ date: -1 });
  }

  static async createTransaction(transactionData: {
    date: string;
    accountId: string;
    accountName: string;
    category: string;
    subcategory: string;
    amount: number;
    isRecurring: boolean;
    frequency?: 'Daily' | 'Weekly' | 'Monthly' | 'Yearly';
    recurringDate?: string;
    remarks?: string;
  }) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const transaction = new Transaction(transactionData);
      await transaction.save({ session });
      await AccountService.updateAccountBalance(transactionData.accountId, transactionData.amount);
      
      await session.commitTransaction();
      return transaction;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}

export class BudgetService {
  static async getBudgetsByMonth(month: string) {
    return Budget.find({ month });
  }

  static async createBudget(budgetData: {
    month: string;
    items: Array<{
      category: string;
      subcategory: string;
      budgetAmount: number;
      actualAmount: number;
    }>;
  }) {
    const budget = new Budget(budgetData);
    return budget.save();
  }

  static async calculateActualSpending(month: string) {
    const startDate = new Date(month);
    const endDate = new Date(startDate.getFullYear(), startDate.getMonth() + 1, 0);

    return Transaction.aggregate([
      {
        $match: {
          date: {
            $gte: startDate,
            $lte: endDate
          }
        }
      },
      {
        $group: {
          _id: {
            category: '$category',
            subcategory: '$subcategory'
          },
          actualAmount: { $sum: '$amount' }
        }
      }
    ]);
  }
}

export class CategoryService {
  static async getAllCategories() {
    return Category.find();
  }

  static async createCategory(name: string) {
    const category = new Category({ name });
    return category.save();
  }
}

export class SubcategoryService {
  static async getSubcategoriesByCategory(category: string) {
    return Subcategory.find({ category });
  }

  static async createSubcategory(data: { name: string; type: 'Income' | 'Expense'; category: string }) {
    const subcategory = new Subcategory(data);
    return subcategory.save();
  }
}

export class InvestmentService {
  static async getAllInvestments() {
    return Investment.find();
  }

  static async createInvestment(investmentData: {
    name: string;
    type: string;
    amount: number;
    purchaseDate: string;
  }) {
    const investment = new Investment(investmentData);
    return investment.save();
  }

  static async getInvestmentsByType(type: string) {
    return Investment.find({ type });
  }

  static async calculateTotalInvestments() {
    return Investment.aggregate([
      {
        $group: {
          _id: '$type',
          total: { $sum: '$amount' }
        }
      }
    ]);
  }
}