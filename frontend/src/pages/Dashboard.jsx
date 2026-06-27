import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";

import { useEffect, useState } from "react";
import api from "../api/axios";
import Layout from "../components/Layout";

function Dashboard() {

    const [totalSpending, setTotalSpending] = useState(0);
    const [categories, setCategories] = useState([]);
    const [monthlyData, setMonthlyData] = useState([]);
    const [recentExpenses, setRecentExpenses] = useState([]);
    const [aiInsights, setAiInsights] = useState([]);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [topCategory, setTopCategory] = useState({
        category: "N/A",
        total: 0
    });
    const [budget, setBudget] = useState(0);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {

        const token = localStorage.getItem("token");

        const headers = {
            Authorization: `Bearer ${token}`
        };

        try {

            const totalResponse = await api.get(
                "/dashboard/total-spending",
                { headers }
            );

            const categoryResponse = await api.get(
                "/dashboard/category-spending",
                { headers }
            );

            const recentExpensesResponse = await api.get(
                "/dashboard/recent-expenses",
                { headers }
            );
            const aiInsightsResponse = await api.get(
                "/dashboard/ai-insights",
                { headers }
            );

            const monthlyResponse = await api.get(
                "/dashboard/monthly-spending",
                { headers }
            );

            const totalExpensesResponse = await api.get(
                "/dashboard/total-expenses",
                { headers }
            );

            const topCategoryResponse = await api.get(
                "/dashboard/top-category",
                { headers }
            );
            const budgetResponse = await api.get(
                "/budget/",
                { headers }
            );
            console.log(
                "Budget API Response:",
                budgetResponse.data
            );
            setTotalSpending(
                totalResponse.data.total_spending
            );

            setCategories(
                categoryResponse.data
            );

            setMonthlyData(
                monthlyResponse.data
            );

            setTotalExpenses(
                totalExpensesResponse.data.total_expenses
            );

            setTopCategory(
                topCategoryResponse.data
            );
            setBudget(
                budgetResponse.data.monthly_budget
            );

            setRecentExpenses(
                recentExpensesResponse.data
            );
            setAiInsights(
                aiInsightsResponse.data.insights
            );

        } catch (error) {

            console.error(error);

        }
    };

    const chartColors = [
        "#2563eb",
        "#16a34a",
        "#dc2626",
        "#ea580c",
        "#7c3aed",
        "#0891b2",
        "#ca8a04"
    ];
    const remainingBudget =
        budget - totalSpending;
    const averageExpense =
        totalExpenses > 0
            ? (
                totalSpending /
                totalExpenses
            ).toFixed(2)
            : 0;

    const budgetPercentage =
        budget > 0
            ? Math.min(
                (totalSpending / budget) * 100,
                100
            )
            : 0;
    let budgetAlert = "";

    if (budget > 0) {

        if (totalSpending > budget) {

            budgetAlert =
                `⚠ Budget exceeded by Rs. ${(totalSpending - budget)
                    .toLocaleString()
                }`;

        } else if (budgetPercentage >= 90) {

            budgetAlert =
                "⚠ You have used over 90% of your budget";

        } else if (budgetPercentage >= 75) {

            budgetAlert =
                "⚠ You have used over 75% of your budget";

        }

    }

    return (
        <Layout>

            <h1
                style={{
                    marginBottom: "25px",
                    color: "#1e293b",
                    fontSize: "32px"
                }}
            >
                AI Expense Analyzer Dashboard
            </h1>

            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    marginBottom: "30px",
                    flexWrap: "wrap"
                }}
            >

                <div
                    style={{
                        flex: 1,
                        minWidth: "220px",
                        background: "#2563eb",
                        color: "white",
                        padding: "20px",
                        borderRadius: "12px",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
                    }}
                >
                    <h3>Total Spending</h3>

                    <h1>
                        Rs. {Number(totalSpending).toLocaleString()}
                    </h1>
                </div>

                <div
                    style={{
                        flex: 1,
                        minWidth: "220px",
                        background: "#16a34a",
                        color: "white",
                        padding: "20px",
                        borderRadius: "12px",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",

                        transition: "all 0.3s ease",
                        cursor: "pointer",

                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <h3>Total Expenses</h3>

                    <h1>
                        {totalExpenses}
                    </h1>

                </div>
                <div
                    style={{
                        flex: 1,
                        minWidth: "220px",
                        background: "#ea580c",
                        color: "white",
                        padding: "20px",
                        borderRadius: "12px",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",

                        transition: "all 0.3s ease",
                        cursor: "pointer",

                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <h3>Average Expense</h3>

                    <h1>
                        Rs. {averageExpense}
                    </h1>
                </div>

                <div
                    style={{
                        flex: 1,
                        minWidth: "220px",
                        background: "#7c3aed",
                        color: "white",
                        padding: "20px",
                        borderRadius: "12px",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",

                        transition: "all 0.3s ease",
                        cursor: "pointer",

                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}

                >
                    <h3>Top Category</h3>

                    <h1>
                        {topCategory.category}
                    </h1>

                    <p>
                        Rs. {topCategory.total}
                    </p>
                </div>

            </div>

            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    flexWrap: "wrap"
                }}
            >

                <div
                    style={{
                        flex: 1,
                        minWidth: "400px",
                        background: "#ffffff",
                        padding: "20px",
                        borderRadius: "12px",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",

                        transition: "all 0.3s ease",
                        cursor: "pointer",

                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                    }}
                >
                    <div
                        style={{
                            flex: 1,
                            minWidth: "220px",
                            background: "#0f766e",
                            color: "white",
                            padding: "20px",
                            borderRadius: "12px",
                            boxShadow: "0 8px 20px rgba(0,0,0,0.08)"
                        }}
                    >
                        <h3>Monthly Budget</h3>

                        <h1>
                            Rs. {Number(budget).toLocaleString()}
                        </h1>

                        <p
                            style={{
                                fontWeight: "bold",
                                color:
                                    remainingBudget < 0
                                        ? "#fecaca"
                                        : "#bbf7d0"
                            }}
                        >
                            Remaining:
                            {" "}
                            Rs. {Number(remainingBudget).toLocaleString()}
                        </p>

                        {
                            budgetAlert && (
                                <div
                                    style={{
                                        marginTop: "12px",
                                        padding: "10px",
                                        background:
                                            totalSpending > budget
                                                ? "#dc2626"
                                                : budgetPercentage >= 75
                                                    ? "#f59e0b"
                                                    : "#16a34a",
                                        color: "#dc2626",
                                        borderRadius: "8px",
                                        fontWeight: "bold",

                                        transition: "all 0.3s ease",
                                        cursor: "pointer",

                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "center",
                                    }}
                                >
                                    {budgetAlert}
                                </div>
                            )
                        }
                    </div>
                    <h3
                        style={{
                            marginBottom: "15px",
                            color: "#334155"
                        }}
                    >
                        Category Spending Analysis
                    </h3>

                    <ResponsiveContainer
                        width="100%"
                        height={300}
                    >
                        <PieChart>

                            <Pie
                                data={categories}
                                dataKey="total"
                                nameKey="category"
                                outerRadius={100}
                                label
                            >
                                {
                                    categories.map(
                                        (entry, index) => (
                                            <Cell
                                                key={index}
                                                fill={
                                                    chartColors[
                                                    index %
                                                    chartColors.length
                                                    ]
                                                }
                                            />
                                        )
                                    )
                                }
                            </Pie>

                            <Tooltip />

                        </PieChart>
                    </ResponsiveContainer>

                </div>

                <div
                    style={{
                        flex: 1,
                        minWidth: "400px",
                        background: "#ffffff",
                        padding: "20px",
                        borderRadius: "12px",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.06)"
                    }}
                >
                    <h3
                        style={{
                            marginBottom: "15px",
                            color: "#334155"
                        }}
                    >
                        Monthly Spending Trend
                    </h3>

                    <ResponsiveContainer
                        width="100%"
                        height={300}
                    >
                        <BarChart data={monthlyData}>

                            <CartesianGrid
                                strokeDasharray="3 3"
                            />

                            <XAxis dataKey="month" />

                            <YAxis />

                            <Tooltip />

                            <Bar
                                dataKey="total"
                                fill="#2563eb"
                            />

                        </BarChart>
                    </ResponsiveContainer>

                </div>

            </div>

            <div
                style={{
                    marginTop: "30px",
                    background: "#ffffff",
                    padding: "20px",
                    borderRadius: "12px",
                    boxShadow: "0 8px 20px rgba(0,0,0,0.06)"
                }}
            >
                <h3
                    style={{
                        marginBottom: "15px",
                        color: "#334155"
                    }}
                >
                    Recent Expense Activity
                </h3>

                <table
                    width="100%"
                    style={{
                        borderCollapse: "collapse"
                    }}
                >
                    <thead>
                        <tr>
                            <th style={{ textAlign: "left", padding: "12px" }}>
                                Title
                            </th>

                            <th style={{ textAlign: "left", padding: "12px" }}>
                                Category
                            </th>

                            <th style={{ textAlign: "left", padding: "12px" }}>
                                Amount
                            </th>

                            <th style={{ textAlign: "left", padding: "12px" }}>
                                Date
                            </th>
                        </tr>
                    </thead>

                    <tbody>

                        {
                            recentExpenses.map((expense) => (
                                <tr
                                    key={expense.id}
                                    style={{
                                        borderTop: "1px solid #e5e7eb"
                                    }}
                                >
                                    <td style={{ padding: "12px" }}>
                                        {expense.title}
                                    </td>

                                    <td style={{ padding: "12px" }}>
                                        {expense.category}
                                    </td>

                                    <td style={{ padding: "12px" }}>
                                        Rs. {Number(expense.amount).toLocaleString()}
                                    </td>

                                    <td style={{ padding: "12px" }}>
                                        {expense.date}
                                    </td>
                                </tr>
                            ))
                        }

                    </tbody>

                </table>
                <div
                    style={{
                        marginTop: "20px",
                        background: "#ffffff",
                        padding: "20px",
                        borderRadius: "12px",
                        boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
                        border: "1px solid #e2e8f0"
                    }}
                >
                    <h3
                        style={{
                            marginBottom: "15px",
                            color: "#334155"
                        }}
                    >
                        🤖 AI Financial Advisor
                    </h3>

                    <div>
                        {aiInsights.map(
                            (insight, index) => (
                                <div
                                    key={index}
                                    style={{
                                        background: "#f8fafc",
                                        padding: "12px",
                                        marginBottom: "10px",
                                        borderLeft: "4px solid #2563eb",
                                        borderRadius: "8px"
                                    }}
                                >
                                    {insight}
                                </div>
                            )
                        )}
                    </div>
                </div>

            </div>

        </Layout>
    );
}

export default Dashboard;