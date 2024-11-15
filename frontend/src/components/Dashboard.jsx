
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import IncomeChart from './IncomeChart';
// import ExpenseChart from './ExpenseChart';
// import TotalChart from './TotalChart';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome for icons
// import './Dashboard.css';

// const Dashboard = () => {
//     const [incomes, setIncomes] = useState([]);
//     const [expenses, setExpenses] = useState([]);

//     useEffect(() => {
//         const fetchIncomes = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8000/api/income/');
//                 setIncomes(response.data);
//             } catch (error) {
//                 console.error('Error fetching incomes:', error);
//             }
//         };

//         const fetchExpenses = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8000/api/expenses/');
//                 setExpenses(response.data);
//             } catch (error) {
//                 console.error('Error fetching expenses:', error);
//             }
//         };

//         fetchIncomes();
//         fetchExpenses();
//     }, []);

//     const totalIncome = incomes.reduce((acc, income) => acc + parseFloat(income.amount || 0), 0);
//     const totalExpense = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount || 0), 0);

//     return (
//         <div className="container-fluid dashboard">
//             <header className="text-center my-4">
//                 <h1 className="display-4 text-primary">Financial Management System</h1>
//                 <p className="lead text-secondary">Overview of your financial data at a glance</p>
//             </header>
            
//             <div className="row mb-4 justify-content-center">
//                 <div className="col d-flex justify-content-center gap-3">
//                     <Link to="/income" className="btn btn-outline-primary btn-lg">
//                         <i className="fas fa-peso-sign me-2"></i> Income
//                     </Link>
//                     <Link to="/expense" className="btn btn-outline-danger btn-lg">
//                         <i className="fas fa-money-bill-wave me-2"></i> Expense
//                     </Link>
//                     <Link to="/report" className="btn btn-outline-secondary btn-lg">
//                         <i className="fas fa-file-alt me-2"></i> Report
//                     </Link>
//                     <Link to="/budget" className="btn btn-outline-success btn-lg">
//                         <i className="fas fa-chart-pie me-2"></i> Budget
//                     </Link>
//                 </div>
//             </div>

//             <div className="row">
//                 <div className="col-lg-6 mb-4">
//                     <div className="card shadow-lg border-0">
//                         <div className="card-body text-center">
//                             <h2 className="card-title text-primary">Total Income vs Total Expense</h2>
//                             <TotalChart totalIncome={totalIncome} totalExpense={totalExpense} />
//                             <div className="mt-3">
//                                 <span className="badge bg-primary p-2 me-2">Income: ₱{totalIncome}</span>
//                                 <span className="badge bg-danger p-2">Expense: ₱{totalExpense}</span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="col-lg-6 mb-4">
//                     <div className="card shadow-lg border-0">
//                         <div className="card-body text-center">
//                             <h2 className="card-title text-success">Income Distribution</h2>
//                             <IncomeChart incomes={incomes} />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="col-lg-6 mb-4">
//                     <div className="card shadow-lg border-0">
//                         <div className="card-body text-center">
//                             <h2 className="card-title text-danger">Expense Breakdown</h2>
//                             <ExpenseChart expenses={expenses} />
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import axios from 'axios';
import IncomeChart from './IncomeChart';
import ExpenseChart from './ExpenseChart';
import TotalChart from './TotalChart';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css'; // Import Font Awesome for icons
import './Dashboard.css';

const Dashboard = () => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const navigate = useNavigate();  // Hook for navigation

    useEffect(() => {
        const fetchIncomes = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/income/');
                setIncomes(response.data);
            } catch (error) {
                console.error('Error fetching incomes:', error);
            }
        };

        const fetchExpenses = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/expenses/');
                setExpenses(response.data);
            } catch (error) {
                console.error('Error fetching expenses:', error);
            }
        };

        fetchIncomes();
        fetchExpenses();
    }, []);

    const totalIncome = incomes.reduce((acc, income) => acc + parseFloat(income.amount || 0), 0);
    const totalExpense = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount || 0), 0);

    const handleLogout = () => {
        // Clear the authentication token or any session data (adjust this based on your app's authentication flow)
        localStorage.removeItem('authToken');
        
        // Redirect to the login page after logging out
        navigate('/login');
    };

    return (
        <div className="container-fluid dashboard">
            <header className="text-center my-4">
                <h1 className="display-4 text-primary">Financial Management System</h1>
                <p className="lead text-secondary">Overview of your financial data at a glance</p>
                {/* Logout Button */}
                <button onClick={handleLogout} className="btn btn-outline-danger">
                    Logout
                </button>
            </header>
            
            <div className="row mb-4 justify-content-center">
                <div className="col d-flex justify-content-center gap-3">
                    <Link to="/income" className="btn btn-outline-primary btn-lg">
                        <i className="fas fa-peso-sign me-2"></i> Income
                    </Link>
                    <Link to="/expense" className="btn btn-outline-danger btn-lg">
                        <i className="fas fa-money-bill-wave me-2"></i> Expense
                    </Link>
                    <Link to="/report" className="btn btn-outline-secondary btn-lg">
                        <i className="fas fa-file-alt me-2"></i> Report
                    </Link>
                    <Link to="/budget" className="btn btn-outline-success btn-lg">
                        <i className="fas fa-chart-pie me-2"></i> Budget
                    </Link>
                </div>
            </div>

            <div className="row">
                <div className="col-lg-6 mb-4">
                    <div className="card shadow-lg border-0">
                        <div className="card-body text-center">
                            <h2 className="card-title text-primary">Total Income vs Total Expense</h2>
                            <TotalChart totalIncome={totalIncome} totalExpense={totalExpense} />
                            <div className="mt-3">
                                <span className="badge bg-primary p-2 me-2">Income: ₱{totalIncome}</span>
                                <span className="badge bg-danger p-2">Expense: ₱{totalExpense}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 mb-4">
                    <div className="card shadow-lg border-0">
                        <div className="card-body text-center">
                            <h2 className="card-title text-success">Income Distribution</h2>
                            <IncomeChart incomes={incomes} />
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 mb-4">
                    <div className="card shadow-lg border-0">
                        <div className="card-body text-center">
                            <h2 className="card-title text-danger">Expense Breakdown</h2>
                            <ExpenseChart expenses={expenses} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
