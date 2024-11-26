// Класс Валюта
class Currency {
    constructor(name) {
      this.name = name;
      this.rates = {}; // Массив дата => курс
    }
  
    addRate(date, rate) {
      this.rates[date] = rate;
    }
  
    getRate(date) {
      return this.rates[date];
    }
  }
  
  // Класс Тип расхода/дохода
  class Type {
    constructor(name) {
      this.name = name;
    }
  }
  
  // Класс Расход
  class Expense {
    constructor(value, type, date) {
      this.value = value;
      this.type = type;
      this.date = date;
    }
  }
  
  // Класс Доход
  class Income {
    constructor(value, type, date) {
      this.value = value;
      this.type = type;
      this.date = date;
    }
  }
  
  // Класс Бюджет
  class Budget {
    constructor() {
      this.currencies = [];
      this.expenseTypes = [];
      this.incomeTypes = [];
      this.expenses = [];
      this.incomes = [];
    }
  
    // Методы CRUD для валюты
    addCurrency(currency) {
      this.currencies.push(currency);
    }
  
    getCurrency(name) {
      return this.currencies.find((currency) => currency.name === name);
    }
  
    updateCurrency(name, newCurrency) {
      const index = this.currencies.findIndex((currency) => currency.name === name);
      if (index !== -1) {
        this.currencies[index] = newCurrency;
      }
    }
  
    deleteCurrency(name) {
      this.currencies = this.currencies.filter((currency) => currency.name !== name);
    }
  
    // Методы CRUD для типов расходов
    addExpenseType(type) {
      this.expenseTypes.push(type);
    }
  
    getExpenseType(name) {
      return this.expenseTypes.find((type) => type.name === name);
    }
  
    updateExpenseType(name, newType) {
      const index = this.expenseTypes.findIndex((type) => type.name === name);
      if (index !== -1) {
        this.expenseTypes[index] = newType;
      }
    }
  
    deleteExpenseType(name) {
      this.expenseTypes = this.expenseTypes.filter((type) => type.name !== name);
    }
  
    // Методы CRUD для типов доходов
    addIncomeType(type) {
      this.incomeTypes.push(type);
    }
  
    getIncomeType(name) {
      return this.incomeTypes.find((type) => type.name === name);
    }
  
    updateIncomeType(name, newType) {
      const index = this.incomeTypes.findIndex((type) => type.name === name);
      if (index !== -1) {
        this.incomeTypes[index] = newType;
      }
    }
  
    deleteIncomeType(name) {
      this.incomeTypes = this.incomeTypes.filter((type) => type.name !== name);
    }
  
    // Методы CRUD для расходов
    addExpense(expense) {
      this.expenses.push(expense);
    }
  
    getExpenses() {
      return this.expenses;
    }
  
    updateExpense(index, newExpense) {
      if (index >= 0 && index < this.expenses.length) {
        this.expenses[index] = newExpense;
      }
    }
  
    deleteExpense(index) {
      this.expenses.splice(index, 1);
    }
  
    // Методы CRUD для доходов
    addIncome(income) {
      this.incomes.push(income);
    }
  
    getIncomes() {
      return this.incomes;
    }
  
    updateIncome(index, newIncome) {
      if (index >= 0 && index < this.incomes.length) {
        this.incomes[index] = newIncome;
      }
    }
  
    deleteIncome(index) {
      this.incomes.splice(index, 1);
    }
  
    // Метод Баланс - расчет баланса за период
    getBalance(startDate, endDate, typeFilter = null) {
      let incomeTotal = 0;
      let expenseTotal = 0;
  
      this.incomes.forEach((income) => {
        if (income.date >= startDate && income.date <= endDate) {
          if (!typeFilter || income.type.name === typeFilter) {
            incomeTotal += income.value;
          }
        }
      });
  
      this.expenses.forEach((expense) => {
        if (expense.date >= startDate && expense.date <= endDate) {
          if (!typeFilter || expense.type.name === typeFilter) {
            expenseTotal += expense.value;
          }
        }
      });
  
      return incomeTotal - expenseTotal;
    }
  
    // Метод Фильтр - выбор доходов/расходов за период
    filterEntries(startDate, endDate, typeFilter = null) {
      const filteredIncomes = this.incomes.filter(
        (income) =>
          income.date >= startDate &&
          income.date <= endDate &&
          (!typeFilter || income.type.name === typeFilter)
      );
  
      const filteredExpenses = this.expenses.filter(
        (expense) =>
          expense.date >= startDate &&
          expense.date <= endDate &&
          (!typeFilter || expense.type.name === typeFilter)
      );
  
      return { incomes: filteredIncomes, expenses: filteredExpenses };
    }
  }