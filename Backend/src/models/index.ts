import mongoose, { Document, Schema } from 'mongoose';
import { z } from 'zod';

// Validation schemas
export const AccountSchema = z.object({
  name: z.string().min(1),
  type: z.enum(['Cash', 'Bank', 'Credit Card']),
  balance: z.number().default(0),
  billGenerationDate: z.string().optional(),
  dueDate: z.string().optional(),
  reminder: z.boolean().default(false)
});

export type Account = z.infer<typeof AccountSchema>;

// Account Schema
const accountSchema = new Schema<Account>({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    type: {
        type: String,
        enum: ['Cash', 'Bank', 'Credit Card'],
        required: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    },
    billGenerationDate: String,
    dueDate: String,
    reminder: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

// Transaction Schema
const transactionSchema = new mongoose.Schema({
    date: {
        type: String,
        required: true
    },
    accountId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    accountName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    isRecurring: {
        type: Boolean,
        default: false
    },
    frequency: {
        type: String,
        enum: ['Daily', 'Weekly', 'Monthly', 'Yearly'],
        required: false
    },
    recurringDate: {
        type: String,
        required: false
    },
    remarks: {
        type: String,
        maxlength: 255
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Category Schema
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Subcategory Schema
const subcategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Investment Schema
const investmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Budget Schema
const budgetSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    amount: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Account = mongoose.model('Account', accountSchema);
const Transaction = mongoose.model('Transaction', transactionSchema);
const Category = mongoose.model('Category', categorySchema);
const Subcategory = mongoose.model('Subcategory', subcategorySchema);
const Investment = mongoose.model('Investment', investmentSchema);
const Budget = mongoose.model('Budget', budgetSchema);

export { Account, Transaction, Category, Subcategory, Investment, Budget };