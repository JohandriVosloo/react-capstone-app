import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { EventProvider } from "./context/EventContext";

import Header from "./routes/Header";
import ProtectedRoute from "./routes/ProtectedRoute";

import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AddEvent from "./components/AddEvent";
import EditEvent from "./components/EditEvent";
import Help from "./components/Help";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <EventProvider>
          <Header />

          <div className="page-content">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />

              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/add-event"
                element={
                  <ProtectedRoute>
                    <AddEvent />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/edit/:id"
                element={
                  <ProtectedRoute>
                    <EditEvent />
                  </ProtectedRoute>
                }
              />

              <Route path="/help" element={<Help />} />
            </Routes>
          </div>
        </EventProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

