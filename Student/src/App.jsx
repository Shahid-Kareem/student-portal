import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "./Context/AuthContext";
import ProtectedRoute from "./Components/ProtectedRoute";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";
import Schedule from "./Pages/Schedule";
import SubjectsGrades from "./Pages/SubjectsGrades";
import Assignments from "./Pages/Assignments";
import Quize from "./Pages/Quize";
import Exams from "./Pages/Exams";
import Report from "./Pages/Report";
import Attendance from "./Pages/Attendance";
import Fees from "./Pages/Fees";
import Library from "./Pages/Library";
import Activities from "./Pages/Activities";
import Notices from "./Pages/Notices";
import Teachers from "./Pages/Teachers";
import Weather from "./Pages/Weather";
import Login from "./Pages/Login";
import Quizdetail from "./Pages/Quizdetail";

function App() {
  const { token } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>

        {/* Sidebar only visible when logged in */}
        {token && (
          <Sidebar
            isOpen={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />
        )}

        <div style={{ flex: 1, padding: token ? "20px" : "0" }}>
          <Routes>

            {/* Public route — redirect to dashboard if already logged in */}
            <Route
              path="/"
              element={token ? <Navigate to="/dashboard" replace /> : <Login />}
            />

            {/* Protected routes */}
            <Route path="/dashboard"    element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/profile"      element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/schedule"     element={<ProtectedRoute><Schedule /></ProtectedRoute>} />
            <Route path="/subjects"     element={<ProtectedRoute><SubjectsGrades /></ProtectedRoute>} />
            <Route path="/assignments"  element={<ProtectedRoute><Assignments /></ProtectedRoute>} />
            <Route path="/quizzes"  element={<ProtectedRoute><Quize /></ProtectedRoute>} />
            <Route path="/quizzes/:id"  element={<ProtectedRoute><Quizdetail /></ProtectedRoute>} />

            <Route path="/exams"        element={<ProtectedRoute><Exams /></ProtectedRoute>} />
            <Route path="/report"       element={<ProtectedRoute><Report /></ProtectedRoute>} />
            <Route path="/attendance"   element={<ProtectedRoute><Attendance /></ProtectedRoute>} />
            <Route path="/Fee&payments" element={<ProtectedRoute><Fees /></ProtectedRoute>} />
            <Route path="/library"      element={<ProtectedRoute><Library /></ProtectedRoute>} />
            <Route path="/activities"   element={<ProtectedRoute><Activities /></ProtectedRoute>} />
            <Route path="/notices"      element={<ProtectedRoute><Notices /></ProtectedRoute>} />
            <Route path="/teachers"     element={<ProtectedRoute><Teachers /></ProtectedRoute>} />
            <Route path="/weather"      element={<ProtectedRoute><Weather /></ProtectedRoute>} />

            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
