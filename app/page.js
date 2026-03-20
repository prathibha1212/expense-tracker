"use client";
import { useState, useEffect } from "react";
import Chart from "./components/Chart";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [customText, setCustomText] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("transactions"));
    if (saved) setTransactions(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const addTransaction = (e) => {
    e.preventDefault();

    if (!amount || !category || (category === "Others" && !customText)) return;

    const label = category === "Others" ? customText : category;

    const newTransaction = {
      id: Date.now(),
      label,
      amount: +amount,
      date: new Date().toLocaleDateString(),
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
          width: "450px",
          background: "white",
          padding: "18px",
          borderRadius: "15px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "10px" }}>
          💰 Expense Tracker
        </h2>

        <h3 style={{ textAlign: "center", marginBottom: "10px" }}>
          ₹{balance}
        </h3>

        {/* Cards */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "12px 0",
          }}
        >
          <div
            style={{
              background: "#e8fff1",
              padding: "10px",
              borderRadius: "8px",
              width: "48%",
              textAlign: "center",
            }}
          >
            <small>Income</small>
            <p style={{ color: "green", fontWeight: "bold" }}>
              ₹{income}
            </p>
          </div>

          <div
            style={{
              background: "#ffecec",
              padding: "10px",
              borderRadius: "8px",
              width: "48%",
              textAlign: "center",
            }}
          >
            <small>Expense</small>
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
            gap: "8px",
            marginTop: "10px",
            flexWrap: "wrap",
          }}
        >
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{
              flex: "1",
              padding: "8px",
              borderRadius: "6px",
              border: "1px solid #ccc",
            }}
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={{
              flex: "1",
              padding: "8px",
              borderRadius: "6px",
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

          {category === "Others" && (
            <input
              type="text"
              placeholder="Description"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              style={{
                flex: "1 1 100%",
                padding: "8px",
                borderRadius: "6px",
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
              padding: "8px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Add
          </button>
        </form>

        {/* Transactions */}
        <h4 style={{ marginTop: "15px" }}>Transactions</h4>

        <ul
          style={{
            marginTop: "10px",
            padding: 0,
            listStyle: "none",
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {transactions.map((t) => (
            <li
              key={t.id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px",
                marginBottom: "8px",
                borderRadius: "6px",
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
                ₹{Math.abs(t.amount)}
                <button
                  onClick={() => deleteTransaction(t.id)}
                  style={{
                    marginLeft: "8px",
                    background: "#ff4d4d",
                    color: "white",
                    border: "none",
                    padding: "4px 6px",
                    borderRadius: "5px",
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