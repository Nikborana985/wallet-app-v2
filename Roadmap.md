# Roadmap for Expense Management Web Application

## Overview
The Expense Management Web Application is a personal project designed to streamline income and expense tracking, manage account balances, handle recurring transactions, and provide insights into financial health. Below is the detailed roadmap for development.

---

## Modules and Features

### **1. Dashboard Module**
#### Purpose
Provide an overview of financial health at a glance.

#### Features
- **Account Balances Grouping**:
  - Group balances into:
    - Cash
    - Bank (expand to show individual bank accounts).
    - Credit Cards (expand to show individual cards with details like outstanding balance and due date).
  - Clickable groups to reveal detailed accounts.
- **Visual Charts**:
  - Pie chart for expense categories (Needs, Wants, Savings).
  - Line graph for spending trends.
- **Budget Utilization**:
  - Display progress of budget allocation (50% Needs, 30% Wants, 20% Savings).
- **Upcoming Bill Payments**:
  - Show:
    - Credit card bills with due dates.
    - Recurring payments (e.g., subscriptions, rent).
  - Highlight overdue payments and those due soon.
- **Notification Center**:
  - Receive notifications for:
    - Recurring expenses.
    - Credit card bill payments.
    - Upcoming investments based on recommendations.

---

### **2. Transaction Management Module**
#### Purpose
Manage all financial transactions (income, expenses, and transfers).

#### Features
- **Add Transaction**:
  - Single form to input details.
  - Dropdown to select category (Income/Expense inferred automatically).
- **Edit/Delete Transaction**.
- **Recurring Transactions**:
  - Set frequency (daily, weekly, monthly, yearly).
  - Option to disable or pause recurrences.
- **Transfers**:
  - Handle intra-account transfers:
    - Example: Cash withdrawal from Bank → Bank (-), Cash (+).
    - Example: Credit Card bill payment → Bank (-), Credit Card (+).
- **Bulk Transactions**:
  - Import and export transactions via Excel files.
- **Filter/Search**:
  - Search by date range, category, or amount.

#### Data Fields
| Field Name        | Type         | Auto-Populated Logic                                          |
|--------------------|--------------|--------------------------------------------------------------|
| Transaction Date   | Date Picker  | Default to today’s date.                                     |
| Account Type       | Dropdown     | User selects from Cash, Bank, Credit Card.                  |
| Account Name       | Dropdown     | Filtered based on selected Account Type.                    |
| Category           | Dropdown     | User-defined categories (e.g., Rent, Salary).               |
| Amount             | Number Input| User input.                                                  |
| Recurring?         | Checkbox     | Enable recurrence setup if checked.                         |

---

### **3. Account Management Module**
#### Purpose
Track balances across different accounts.

#### Features
- **Account Types**:
  - Cash: Name, Current Balance.
  - Bank: Name, Account Number, Balance.
  - Credit Card:
    - Name
    - Outstanding Balance (auto-calculated).
    - Bill Generation Date (date picker).
    - Due Date (date picker).
    - Reminder Option (checkbox).
- **Dynamic Updates**:
  - Balances automatically adjust based on transactions.

---

### **4. Expense Categorization & Budgeting Module**
#### Purpose
Organize and monitor spending habits.

#### Features
- **Categorization**:
  - Main Categories: Needs, Wants, Savings.
  - Subcategories: Rent, Fuel, Entertainment, etc.
- **Budgeting**:
  - Allocate percentages of income:
    - 50% Needs
    - 30% Wants
    - 20% Savings
  - Link Savings to Investments (see Investment Tracking Module) for automated calculations of available funds for investments.
  - Alerts for nearing/exceeding budgets.

---

### **5. Investment Tracking Module**
#### Purpose
Record and view investment details.

#### Features
- **Link to Savings**:
  - Savings expenses directly tied to investments.
- **Integration with Investment Advice Module**:
  - Track and monitor suggested investments from the Investment Advice Module.
- **Investment Details**:
  - Add/Edit/Delete investment entries.
  - Fields: Asset type, purchase date, amount.
- **Summary**:
  - Aggregated investments by type.
- **No Live Tracking**:
  - Manual updates only.

#### Algorithms
1. **Risk-Based Allocation Algorithm**:
   ```python
   def allocate_investments(age, income, savings):
       if age <= 35:
           allocation = {"equities": 0.7, "fixed_income": 0.2, "cash": 0.1}
       elif 36 <= age <= 50:
           allocation = {"equities": 0.5, "fixed_income": 0.3, "cash": 0.2}
       else:
           allocation = {"equities": 0.3, "fixed_income": 0.4, "cash": 0.3}

       monthly_investment = savings * 0.2  # 20% of savings for investments
       return {asset: monthly_investment * percent for asset, percent in allocation.items()}
   ```

2. **Income Tier Investment Prioritization**:
   ```python
   def suggest_investment_options(income):
       if income < 50000:
           return ["Low-cost index funds", "Government bonds"]
       elif income <= 150000:
           return ["Mutual funds (SIP)", "Corporate bonds"]
       else:
           return ["Direct equities", "REITs (Real Estate Investment Trusts)", "Alternative assets"]
   ```

3. **Goal-Based Allocation**:
   ```python
   def allocate_for_goals(goal_duration, savings):
       if goal_duration < 5:  # Short-term
           return {"debt_instruments": savings * 0.8, "cash": savings * 0.2}
       else:  # Long-term
           return {"equities": savings * 0.6, "fixed_income": savings * 0.3, "cash": savings * 0.1}
   ```

---

### **6. Reporting & Analysis Module**
#### Purpose
Provide insights into financial activity.

#### Features
- **Reports**:
  - Monthly/Yearly summaries.
  - Downloadable in PDF/Excel format.
- **Visual Comparisons**:
  - Month-over-month spending trends.
  - Income vs. Expenses.

---

### **7. Settings & Customization Module**
#### Purpose
Personalize the application to fit user preferences.

#### Features
- Dark mode toggle.
- Customize categories/subcategories.
- Currency preference (optional).
- Data Import/Export:
  - CSV/Excel upload for transaction history.
  - Backup and restore functionality.

---

### **8. Mobile Responsiveness**
#### Purpose
Ensure the application is accessible and functional across all devices.

#### Features
- **Progressive Web App (PWA) Support**:
  - Enable installation as an app on mobile devices.
- **Offline Transaction Recording**:
  - Allow recording transactions without internet connectivity.
  - Sync data once back online.
- **Touch-Friendly Interface**:
  - Optimize buttons, forms, and navigation for mobile touchscreens.

---

## Development Steps
1. **Initial Setup**:
   - Define project structure.
   - Set up database schema for accounts, transactions, and budgets.
2. **Module-by-Module Development**:
   - Start with core functionality (Transaction Management, Account Management).
   - Gradually add dashboards, categorization, and investment tracking.
3. **Testing**:
   - Unit tests for modules.
   - End-to-end testing for user flows.
4. **Deployment**:
   - Use free hosting services for frontend and backend.
   - Ensure database hosting supports scaling.

---

## Tech Stack
### Frontend
- Framework: React.js
- Styling: Tailwind CSS
- **Libraries**:
  - Chart.js: For generating visual charts in the Dashboard Module.
  - React-datepicker: For date selection inputs in forms.

### Backend
- Framework: Node.js (Express)
- Database: MongoDB (Atlas)
- **Libraries**:
  - NumPy and Pandas (via Python microservices): For complex financial calculations.
  - Cron Jobs: For managing reminders and recurring tasks.

### Hosting
- Frontend: Netlify
- Backend: Railway
- Database: MongoDB Atlas

---

This roadmap ensures a structured approach to building a feature-rich and user-friendly Expense Management application. Let me know if you’d like to refine or add further details!
