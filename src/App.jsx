import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";
import Schedule from "./Pages/Schedule";

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        <Sidebar />
        


        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/shedule" element={<Schedule/>} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;