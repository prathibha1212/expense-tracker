"use client";
import { useState, useEffect } from "react";
import Chart from "./components/Chart";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [customText, setCustomText] = useState("");

  // Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("transactions"));
    if (saved) setTransactions(saved);
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (e) => {
    e.preventDefault();

    if (!amount || !category) return;

    const label =
      category === "Others" ? customText : category;

    const newTransaction = {
      id: Date.now(),
      label,
      amount: +amount,
      date: new Date().toLocaleDateString(), // ✅ DATE ADDED
    };

    setTransactions([newTransaction, ...transactions]);

    setAmount("");
    setCategory("");
    setCustomText("");
  };

  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const balance = income + expense;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #eef2f3, #8e9eab)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "500px",
          background: "white",
          padding: "25px",
          borderRadius: "15px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ textAlign: "center" }}>💰 Expense Tracker</h1>

        <h2 style={{ textAlign: "center" }}>₹{balance}</h2>

        {/* Cards */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "20px 0",
          }}
        >
          <div
            style={{
              background: "#e8fff1",
              padding: "15px",
              borderRadius: "10px",
              width: "48%",
              textAlign: "center",
            }}
          >
            <h4>Income</h4>
            <p style={{ color: "green", fontWeight: "bold" }}>
              ₹{income}
            </p>
          </div>

          <div
            style={{
              background: "#ffecec",
              padding: "15px",
              borderRadius: "10px",
              width: "48%",
              textAlign: "center",
            }}
          >
            <h4>Expense</h4>
            <p style={{ color: "red", fontWeight: "bold" }}>
              ₹{Math.abs(expense)}
            </p>
          </div>
        </div>

        {/* Chart */}
        <Chart income={income} expense={expense} />

        {/* Form */}
        <form
          onSubmit={addTransaction}
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "15px",
            flexWrap: "wrap",
          }}
        >
          <input
            type="number"
            placeholder="Amount (+/-)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{
              flex: "1",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              flex: "1",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          >
            <option value="">Category</option>
            <option value="Food">Food</option>
            <option value="Travel">Travel</option>
            <option value="Shopping">Shopping</option>
            <option value="Salary">Salary</option>
            <option value="Others">Others</option>
          </select>

          {/* Conditional input */}
          {category === "Others" && (
            <input
              type="text"
              placeholder="Enter description"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              style={{
                flex: "1 1 100%",
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
              }}
            />
          )}

          <button
            style={{
              width: "100%",
              background: "#0070f3",
              color: "white",
              border: "none",
              padding: "10px",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Add Transaction
          </button>
        </form>

        {/* Transactions */}
        <ul style={{ marginTop: "20px", padding: 0, listStyle: "none" }}>
          {transactions.map((t) => (
            <li
              key={t.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "8px",
                background:
                  t.amount > 0 ? "#e8fff1" : "#ffecec",
              }}
            >
              <span>
                {t.label}
                <br />
                <small style={{ color: "gray" }}>{t.date}</small>
              </span>

              <span>
                ₹{t.amount}
                <button
                  onClick={() => deleteTransaction(t.id)}
                  style={{
                    marginLeft: "10px",
                    background: "#ff4d4d",
                    color: "white",
                    border: "none",
                    padding: "5px 8px",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  ✕
                </button>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}