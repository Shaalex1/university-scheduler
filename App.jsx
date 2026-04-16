import { useState } from "react";
import Navbar from "./components/Navbar";
import AIChatBox from "./components/AIChatBox";
import SchedulerPage from "./features/scheduler/SchedulerPage";
import CoursesPage from "./features/courses/CoursesPage";
import ClassroomsPage from "./features/classrooms/ClassroomsPage";

export default function App() {
  const [tab, setTab] = useState("scheduler");
  const [selectedCodes, setSelectedCodes] = useState(["COE 416", "COE 424", "COE 547"]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 text-slate-900">
      <Navbar tab={tab} setTab={setTab} />

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
