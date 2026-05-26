
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Courses from "@/pages/Courses";
import CourseDetail from "@/pages/CourseDetail";
import Practice from "@/pages/Practice";
import Progress from "@/pages/Progress";
import Community from "@/pages/Community";
import Achievements from "@/pages/Achievements";

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/community" element={<Community />} />
          <Route path="/achievements" element={<Achievements />} />
        </Routes>
      </div>
    </Router>
  );
}

