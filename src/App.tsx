import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Logout from "./pages/logout/Logout";
import NewExpense from "./pages/expense/NewExpense";
import ExpenseDetails from "./pages/expense/ExpenseDetails";
import ExpenseReports from "./pages/expense/ExpenseReports";
import Register from "./pages/register/Register";

// Define a type for the user object
interface User {
  email: string;
  name: string;
}

const App = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // Check local storage for user on initial load
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Error parsing stored user:", e);
        localStorage.removeItem('currentUser'); // Clear invalid item
      }
    }

    // Listen for storage changes to sync across tabs/windows
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'currentUser') {
        if (event.newValue) {
          try {
            setCurrentUser(JSON.parse(event.newValue));
          } catch (e) {
            console.error("Error parsing stored user from storage event:", e);
            // Optionally clear the invalid item from localStorage again
          }
        } else {
          setCurrentUser(null);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const isAuthenticated = currentUser !== null;

  return (
    <BrowserRouter>
      <Navbar currentUser={currentUser} />
      <Routes>
        <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout setCurrentUser={setCurrentUser} />} />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} element={<Dashboard />} />
          }
        />
        <Route
          path="/new"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} element={<NewExpense />} />
          }
        />
        <Route
          path="/view"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} element={<ExpenseDetails />} />
          }
        />
        <Route
          path="/reports"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated} element={<ExpenseReports />} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
