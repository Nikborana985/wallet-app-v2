export const createTransaction = async (req, res) => {
    const transaction = new Transaction(req.body);
    await transaction.save();
    res.status(201).send(transaction);
};

export const getTransactions = async (req, res) => {
    const transactions = await Transaction.find();
    res.status(200).send(transactions);
};

export const createAccount = async (req, res) => {
    const account = new Account(req.body);
    await account.save();
    res.status(201).send(account);
};

export const getAccounts = async (req, res) => {
    const accounts = await Account.find();
    res.status(200).send(accounts);
};