import { useState } from "react";
import { Wallet, AlertCircle, DollarSign, TrendingUp } from "lucide-react";
import { staticData } from "../../utils/staticData";

const BudgetPage = () => {
  const [monthlyBudget, setMonthlyBudget] = useState(50000);
  const [editBudget, setEditBudget] = useState(50000);
  const [showForm, setShowForm] = useState(false);

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();

  const monthLogs = staticData.fuelLogs.filter((log) => {
    const d = new Date(log.date);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const totalSpent = monthLogs.reduce((s, l) => s + l.cost, 0);
  const percentageUsed = monthlyBudget > 0 ? Math.round((totalSpent / monthlyBudget) * 100) : 0;
  const remaining = monthlyBudget - totalSpent;
  const isOverBudget = totalSpent > monthlyBudget;
  const isEightyPercent = percentageUsed >= 80 && !isOverBudget;

  const handleSaveBudget = () => {
    if (editBudget > 0) {
      setMonthlyBudget(editBudget);
      setShowForm(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Budget Management</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6">Set monthly fuel budgets and track your expenses.</p>

      {(isEightyPercent || isOverBudget) && (
        <div className={`flex items-center gap-2 px-4 py-3 rounded-xl mb-6 text-sm ${
          isOverBudget
            ? "bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 text-red-700 dark:text-red-400"
            : "bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700 text-yellow-700 dark:text-yellow-400"
        }`}>
          <AlertCircle size={18} />
          {isOverBudget
            ? "Budget exceeded! You have crossed your monthly fuel budget limit."
            : "Warning: You have used 80% of your monthly fuel budget."}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <Wallet className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Monthly Budget</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">Rs. {monthlyBudget.toLocaleString()}</p>
          <button onClick={() => { setEditBudget(monthlyBudget); setShowForm(true); }} className="text-xs text-[var(--primary-color)] hover:underline mt-1">
            Edit Budget
          </button>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Spent This Month</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">Rs. {totalSpent.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-1">{monthLogs.length} purchase{monthLogs.length !== 1 ? "s" : ""}</p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">Remaining</span>
          </div>
          <p className={`text-2xl font-bold ${remaining >= 0 ? "text-green-600" : "text-red-600"}`}>
            {remaining >= 0 ? `Rs. ${remaining.toLocaleString()}` : "Over Budget"}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Budget Progress</h2>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-5 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              isOverBudget ? "bg-red-500" : percentageUsed >= 80 ? "bg-yellow-500" : "bg-[var(--primary-color)]"
            }`}
            style={{ width: `${Math.min(percentageUsed, 100)}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span className="text-gray-600 dark:text-gray-400">{percentageUsed}% used</span>
          <span className="text-gray-600 dark:text-gray-400">Rs. {totalSpent.toLocaleString()} / Rs. {monthlyBudget.toLocaleString()}</span>
        </div>
      </div>

      {showForm && (
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-5">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Set Monthly Budget</h2>
          <div className="flex items-end gap-3 max-w-md">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Budget Amount (PKR)</label>
              <input
                type="number"
                value={editBudget}
                onChange={(e) => setEditBudget(Number(e.target.value))}
                min={1}
                className="w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm focus:border-[var(--primary-color)] focus:ring-1 focus:ring-[var(--primary-color)] dark:bg-gray-700 dark:text-white outline-none"
              />
            </div>
            <button onClick={handleSaveBudget} className="px-4 py-2.5 bg-[var(--primary-color)] text-white rounded-lg text-sm font-medium hover:bg-[var(--primary-hover)] transition-colors">
              Save
            </button>
            <button onClick={() => setShowForm(false)} className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetPage;
