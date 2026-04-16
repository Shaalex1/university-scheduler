import { useState } from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import AIChatBox from "./components/AIChatBox";
import SchedulerPage from "./features/scheduler/SchedulerPage";
import CoursesPage from "./features/courses/CoursesPage";
import ClassroomsPage from "./features/classrooms/ClassroomsPage";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState("scheduler");
  const [selectedCodes, setSelectedCodes] = useState(["COE 416", "COE 424", "COE 547"]);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setTab("scheduler");
  };

  // Show login page if not authenticated
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  // Main authenticated app
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900">
      <Navbar tab={tab} setTab={setTab} user={user} onLogout={handleLogout} />

      {tab === "scheduler" ? (
        <SchedulerPage selectedCodes={selectedCodes} setSelectedCodes={setSelectedCodes} />
      ) : tab === "courses" ? (
        <CoursesPage selectedCodes={selectedCodes} setSelectedCodes={setSelectedCodes} />
      ) : (
        <ClassroomsPage />
      )}

      <AIChatBox />
    </div>
  );
}
