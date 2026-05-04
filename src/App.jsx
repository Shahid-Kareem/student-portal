import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import Dashboard from "./Pages/Dashboard";
import Profile from "./Pages/Profile";
import Schedule from "./Pages/Schedule";
import SubjectsGrades from "./Pages/SubjectsGrades";
import Assignments from "./Pages/Assignments";
import Exams from "./Pages/Exams";
import Report from "./Pages/Report";
import Attendance from "./Pages/Attendance";
import Fees from "./Pages/Fees";
import Library from "./Pages/Library";
import Activities from "./Pages/Activities";
import Notices from "./Pages/Notices";
import Teachers from "./Pages/Teachers";
import Weather from "./Pages/Weather";

function App() {
  return (
    <BrowserRouter>
      <div style={{ display: "flex" }}>
        <Sidebar />
        


        <div style={{ flex: 1, padding: "20px" }}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/schedule" element={<Schedule/>} />
            <Route path='/subjects' element={<SubjectsGrades/>}/>
            <Route path="/assignments" element={<Assignments/>} />
            <Route path='/exams' element={<Exams/>}/>
            <Route path='/report' element={<Report/>}/>
            <Route path='/attendance' element={<Attendance/>}/>
            <Route path='/Fee&payments' element={<Fees/>}/>
            <Route path='/library' element={<Library/>}/>
            <Route path='/activities' element={<Activities/>}/>
            <Route path='/notices' element={<Notices/>}/>
            <Route path='/teachers' element={<Teachers/>}/>
            
            <Route path="/weather" element={<Weather/>}/>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;