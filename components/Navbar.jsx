import { BookOpen, Building2, CalendarDays } from "lucide-react";
import Profile from "./Profile";

function Pill({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition ${
        active
          ? "bg-slate-900 text-white shadow-lg shadow-slate-200"
          : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
      }`}
    >
      {children}
    </button>
  );
}

export default function Navbar({ tab, setTab, user, onLogout }) {
  const items = [
    { id: "scheduler", label: "Scheduler", icon: CalendarDays },
    { id: "courses", label: "Courses", icon: BookOpen },
    { id: "classrooms", label: "Classrooms", icon: Building2 },
  ];

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1680px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <div className="text-xl font-semibold tracking-tight sm:text-2xl">University Scheduler</div>
          <div className="text-sm text-slate-500">Production-style timetable with interactive course selection.</div>
        </div>

        <div className="flex items-center gap-4">
          {/* Navigation Pills */}
          <div className="flex flex-wrap gap-2">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <Pill key={item.id} active={tab === item.id} onClick={() => setTab(item.id)}>
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Pill>
              );
            })}
          </div>

          {/* Profile Component */}
          <Profile user={user} onLogout={onLogout} />
        </div>
      </div>
    </header>
  );
}