export const calculateBudget = (transactions) => {
    const budget = {
        needs: 0,
        wants: 0,
        savings: 0,
    };

    transactions.forEach(transaction => {
        if (transaction.category === 'Needs') {
            budget.needs += transaction.amount;
        } else if (transaction.category === 'Wants') {
            budget.wants += transaction.amount;
        } else if (transaction.category === 'Savings') {
            budget.savings += transaction.amount;
        }
    });

    return budget;
};

export const getSpendingTrends = (transactions) => {
    const trends = {};

    transactions.forEach(transaction => {
        const month = new Date(transaction.date).toLocaleString('default', { month: 'long' });
        trends[month] = (trends[month] || 0) + transaction.amount;
    });

    return trends;
};

export const getAccountBalances = async (AccountModel) => {
    const accounts = await AccountModel.find();
    const balances = accounts.map(account => ({
        name: account.name,
        balance: account.balance,
    }));

    return balances;
};