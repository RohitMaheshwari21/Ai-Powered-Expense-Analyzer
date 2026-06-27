import { useEffect, useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";

function Expenses() {

    const [expenses, setExpenses] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [expenseDate, setExpenseDate] = useState("");

    const [editingId, setEditingId] = useState(null);

    const [editTitle, setEditTitle] = useState("");
    const [editAmount, setEditAmount] = useState("");
    const [editDate, setEditDate] = useState("");

    useEffect(() => {
        fetchExpenses();
    }, []);

    const getHeaders = () => ({
        Authorization: `Bearer ${localStorage.getItem("token")}`
    });

    const fetchExpenses = async () => {

        try {

            const response = await api.get(
                "/expenses/",
                {
                    headers: getHeaders()
                }
            );

            setExpenses(response.data);

        } catch (error) {

            console.error(error);

        }
    };

    const addExpense = async (e) => {

        e.preventDefault();

        try {

            await api.post(
                "/expenses/",
                {
                    title,
                    amount: Number(amount),
                    expense_date: expenseDate
                },
                {
                    headers: getHeaders()
                }
            );

            setTitle("");
            setAmount("");
            setExpenseDate("");

            fetchExpenses();

        } catch (error) {

            console.error(error);

        }
    };

    const startEdit = (expense) => {

        setEditingId(expense.id);

        setEditTitle(expense.title);
        setEditAmount(expense.amount);
        setEditDate(expense.expense_date);
    };

    const updateExpense = async () => {

        try {

            await api.put(
                `/expenses/${editingId}`,
                {
                    title: editTitle,
                    amount: Number(editAmount),
                    expense_date: editDate
                },
                {
                    headers: getHeaders()
                }
            );

            setEditingId(null);

            fetchExpenses();

        } catch (error) {

            console.error(error);

        }
    };

    const deleteExpense = async (id) => {

        try {

            await api.delete(
                `/expenses/${id}`,
                {
                    headers: getHeaders()
                }
            );

            fetchExpenses();

        } catch (error) {

            console.error(error);

        }
    };

    const filteredExpenses = expenses.filter(
        (expense) => {

            const expenseDateObj =
                new Date(expense.expense_date);

            const matchesSearch =
                expense.title
                    .toLowerCase()
                    .includes(
                        searchTerm.toLowerCase()
                    );

            const matchesCategory =
                selectedCategory === "All" ||
                expense.category === selectedCategory;

            const matchesFromDate =
                !fromDate ||
                expenseDateObj >= new Date(fromDate);

            const matchesToDate =
                !toDate ||
                expenseDateObj <= new Date(toDate);

            return (
                matchesSearch &&
                matchesCategory &&
                matchesFromDate &&
                matchesToDate
            );
        }
    );
    const totalExpenses = expenses.length;

    const totalAmount = expenses.reduce(
        (sum, expense) =>
            sum + Number(expense.amount),
        0
    );

    const highestExpense =
        expenses.length > 0
            ? Math.max(
                ...expenses.map(
                    (expense) =>
                        Number(expense.amount)
                )
            )
            : 0;
    const exportToCSV = () => {

        const headers = [
            "Title",
            "Category",
            "Amount",
            "Date"
        ];

        const rows = expenses.map(
            (expense) => [
                expense.title,
                expense.category,
                expense.amount,
                expense.expense_date
            ]
        );

        const csvContent = [
            headers,
            ...rows
        ]
            .map(
                (row) => row.join(",")
            )
            .join("\n");

        const blob = new Blob(
            [csvContent],
            {
                type: "text/csv"
            }
        );

        const url =
            window.URL.createObjectURL(blob);

        const link =
            document.createElement("a");

        link.href = url;

        link.download =
            "expenses.csv";

        link.click();

        window.URL.revokeObjectURL(url);
    };

    return (
        <Layout>

            <h1
                style={{
                    marginBottom: "20px"
                }}
            >
                Expense Management
            </h1>

            <div
                style={{
                    background: "#ffffff",
                    padding: "20px",
                    borderRadius: "12px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                    marginBottom: "30px"
                }}
            >
                <h3>Add New Expense</h3>

                <form
                    onSubmit={addExpense}
                    style={{
                        display: "flex",
                        gap: "10px",
                        flexWrap: "wrap"
                    }}
                >
                    <input
                        type="text"
                        placeholder="Expense Title"
                        value={title}
                        onChange={(e) =>
                            setTitle(e.target.value)
                        }
                        style={{
                            padding: "10px",
                            flex: "1"
                        }}
                    />

                    <input
                        type="number"
                        placeholder="Amount"
                        value={amount}
                        onChange={(e) =>
                            setAmount(e.target.value)
                        }
                        style={{
                            padding: "10px"
                        }}
                    />

                    <input
                        type="date"
                        value={expenseDate}
                        onChange={(e) =>
                            setExpenseDate(e.target.value)
                        }
                        style={{
                            padding: "10px"
                        }}
                    />

                    <button
                        type="submit"
                        style={{
                            background: "#2563eb",
                            color: "white",
                            border: "none",
                            padding: "10px 20px",
                            borderRadius: "6px",
                            cursor: "pointer"
                        }}
                    >
                        Add Expense
                    </button>
                </form>
            </div>

            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    marginBottom: "20px",
                    flexWrap: "wrap"
                }}
            >
                <div
                    style={{
                        flex: 1,
                        minWidth: "200px",
                        background: "#eff6ff",
                        padding: "15px",
                        borderRadius: "10px"
                    }}
                >
                    <h4>Total Expenses</h4>
                    <h2>{totalExpenses}</h2>
                </div>

                <div
                    style={{
                        flex: 1,
                        minWidth: "200px",
                        background: "#ecfdf5",
                        padding: "15px",
                        borderRadius: "10px"
                    }}
                >
                    <h4>Total Amount</h4>
                    <h2>
                        Rs. {totalAmount.toLocaleString()}
                    </h2>
                </div>

                <div
                    style={{
                        flex: 1,
                        minWidth: "200px",
                        background: "#fef2f2",
                        padding: "15px",
                        borderRadius: "10px"
                    }}
                >
                    <h4>Highest Expense</h4>
                    <h2>
                        Rs. {highestExpense.toLocaleString()}
                    </h2>
                </div>
            </div>

            <div
                style={{
                    background: "#ffffff",
                    padding: "20px",
                    borderRadius: "12px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                }}
            >
                <h3>Expense History</h3>
                <div
                    style={{
                        marginBottom: "20px"
                    }}
                >
                    <button
                        onClick={exportToCSV}
                        style={{
                            background: "#2563eb",
                            color: "white",
                            border: "none",
                            padding: "10px 16px",
                            borderRadius: "6px",
                            cursor: "pointer"
                        }}
                    >
                        Export CSV
                    </button>
                </div>

                <input
                    type="text"
                    placeholder="Search expenses..."
                    value={searchTerm}
                    onChange={(e) =>
                        setSearchTerm(e.target.value)
                    }
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "20px",
                        border: "1px solid #ccc",
                        borderRadius: "6px"
                    }}
                />
                <select
                    value={selectedCategory}
                    onChange={(e) =>
                        setSelectedCategory(
                            e.target.value
                        )
                    }
                    style={{
                        width: "100%",
                        padding: "10px",
                        marginBottom: "20px",
                        border: "1px solid #ccc",
                        borderRadius: "6px"
                    }}
                >
                    <option value="All">
                        All Categories
                    </option>

                    {
                        [...new Set(
                            expenses.map(
                                (expense) =>
                                    expense.category
                            )
                        )].map((category) => (
                            <option
                                key={category}
                                value={category}
                            >
                                {category}
                            </option>
                        ))
                    }
                </select>
                <div
                    style={{
                        display: "flex",
                        gap: "10px",
                        marginBottom: "20px"
                    }}
                >
                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) =>
                            setFromDate(
                                e.target.value
                            )
                        }
                        style={{
                            flex: 1,
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "6px"
                        }}
                    />

                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) =>
                            setToDate(
                                e.target.value
                            )
                        }
                        style={{
                            flex: 1,
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "6px"
                        }}
                    />
                    <button
                        onClick={() => {
                            setSearchTerm("");
                            setSelectedCategory("All");
                            setFromDate("");
                            setToDate("");
                        }}
                        style={{
                            padding: "10px 20px",
                            background: "#dc2626",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer"
                        }}
                    >
                        Reset Filters
                    </button>
                </div>

                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse"
                    }}
                >
                    <thead>
                        <tr
                            style={{
                                background: "#f1f5f9"
                            }}
                        >
                            <th style={{ padding: "12px" }}>Title</th>
                            <th style={{ padding: "12px" }}>Category</th>
                            <th style={{ padding: "12px" }}>Amount</th>
                            <th style={{ padding: "12px" }}>Date</th>
                            <th style={{ padding: "12px" }}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>

                        {filteredExpenses.length === 0 ? (

                            <tr>
                                <td
                                    colSpan="5"
                                    style={{
                                        textAlign: "center",
                                        padding: "20px"
                                    }}
                                >
                                    No Expenses Found
                                </td>
                            </tr>

                        ) : (

                            filteredExpenses.map((expense) => (

                                <tr
                                    key={expense.id}
                                    style={{
                                        borderBottom: "1px solid #ddd"
                                    }}
                                >
                                    <td style={{ padding: "10px" }}>
                                        {editingId === expense.id ? (
                                            <input
                                                value={editTitle}
                                                onChange={(e) =>
                                                    setEditTitle(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        ) : (
                                            expense.title
                                        )}
                                    </td>

                                    <td style={{ padding: "10px" }}>
                                        {expense.category}
                                    </td>

                                    <td style={{ padding: "10px" }}>
                                        {editingId === expense.id ? (
                                            <input
                                                type="number"
                                                value={editAmount}
                                                onChange={(e) =>
                                                    setEditAmount(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        ) : (
                                            `Rs. ${expense.amount}`
                                        )}
                                    </td>

                                    <td style={{ padding: "10px" }}>
                                        {editingId === expense.id ? (
                                            <input
                                                type="date"
                                                value={editDate}
                                                onChange={(e) =>
                                                    setEditDate(
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        ) : (
                                            new Date(
                                                expense.expense_date
                                            ).toLocaleDateString()
                                        )}
                                    </td>

                                    <td style={{ padding: "10px" }}>

                                        {editingId === expense.id ? (

                                            <button
                                                onClick={updateExpense}
                                                style={{
                                                    background: "#16a34a",
                                                    color: "white",
                                                    border: "none",
                                                    padding: "8px 12px",
                                                    borderRadius: "6px",
                                                    cursor: "pointer"
                                                }}
                                            >
                                                Save
                                            </button>

                                        ) : (

                                            <button
                                                onClick={() =>
                                                    startEdit(expense)
                                                }
                                                style={{
                                                    background: "#f59e0b",
                                                    color: "white",
                                                    border: "none",
                                                    padding: "8px 12px",
                                                    borderRadius: "6px",
                                                    cursor: "pointer"
                                                }}
                                            >
                                                Edit
                                            </button>

                                        )}

                                        <button
                                            onClick={() =>
                                                deleteExpense(expense.id)
                                            }
                                            style={{
                                                background: "#dc2626",
                                                color: "white",
                                                border: "none",
                                                padding: "8px 12px",
                                                borderRadius: "6px",
                                                cursor: "pointer",
                                                marginLeft: "8px"
                                            }}
                                        >
                                            Delete
                                        </button>

                                    </td>
                                </tr>

                            ))

                        )}

                    </tbody>

                </table>

            </div>

        </Layout>
    );
}

export default Expenses;