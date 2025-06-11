CREATE TABLE entry (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) NOT NULL,
    category VARCHAR(20) NOT NULL CHECK (category IN ('income', 'expense'))
);

CREATE TABLE entry_income (
    date VARCHAR(255) NOT NULL,
    CHECK (category = 'income')
) INHERITS (entry);

CREATE TABLE entry_expense (
    day_to_pay VARCHAR(255) NOT NULL,
    amount_paid DECIMAL(10, 2),
    paid_day VARCHAR(255),
    CHECK (category = 'expense')
) INHERITS (entry);

-- Inserir uma renda
INSERT INTO entry_income (id, name, category, amount, currency, date)
VALUES ('inc_001', 'Salário', 'income', 5000.00, 'BRL',  '2025-06-01');

-- Inserir uma despesa
INSERT INTO entry_expense (id, name, category, amount, currency, day_to_pay, amount_paid, paid_day)
VALUES ('exp_001', 'Conta de luz', 'expense', 200.00, 'BRL', '2025-06-10', 200.00, '2025-06-09');

SELECT 
    e.id, 
    e.name, 
    e.category, 
    e.amount, 
    e.currency, 
    ei.date, 
    ee.day_to_pay, 
    ee.amount_paid, 
    ee.paid_day
FROM entry e
LEFT JOIN entry_income ei ON e.id = ei.id AND e.category = 'income'
LEFT JOIN entry_expense ee ON e.id = ee.id AND e.category = 'expense';