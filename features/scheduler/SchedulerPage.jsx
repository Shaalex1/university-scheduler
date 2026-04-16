import React, { useMemo, useState } from "react";
import { CheckCircle2, AlertTriangle, X, Settings, Calendar } from "lucide-react";

// --- Constants & Helpers ---
const PX_PER_MINUTE = 1; 
const START_MINUTES = 480; // 8:00 AM
const DAY_KEYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const HOURS = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

const timeToMinutes = (timeStr) => {
  const [hrs, mins] = timeStr.split(':').map(Number);
  return hrs * 60 + mins;
};

// --- Sub-Component: Card ---
const Card = ({ children, className = "" }) => (
  <div className={`rounded-3xl border border-slate-200 bg-white shadow-sm ${className}`}>
    {children}
  </div>
);

export default function CourseScheduler() {
  // 1. State Management
  const [selectedCourses, setSelectedCourses] = useState([
    {
      code: "COE 522",
      title: "Machine Learning",
      instructor: "Dr. Smith",
      type: "Lecture",
      day: "Monday",
      start: "09:00",
      end: "10:15",
    },
    {
        code: "COE 424",
        title: "Digital Systems",
        instructor: "Dr. Hamdan",
        type: "Lab",
        day: "Monday",
        start: "09:45",
        end: "11:00",
      }
  ]);
  const [toast, setToast] = useState(null);

  // 2. Derived State (useMemo for performance)
  const conflictCount = useMemo(() => {
    let conflicts = 0;
    for (let i = 0; i < selectedCourses.length; i++) {
      for (let j = i + 1; j < selectedCourses.length; j++) {
        const c1 = selectedCourses[i];
        const c2 = selectedCourses[j];
        if (c1.day === c2.day) {
          const s1 = timeToMinutes(c1.start);
          const e1 = timeToMinutes(c1.end);
          const s2 = timeToMinutes(c2.start);
          const e2 = timeToMinutes(c2.end);
          if (s1 < e2 && s2 < e1) conflicts++;
        }
      }
    }
    return conflicts;
  }, [selectedCourses]);

  const removeCourse = (code) => {
    setSelectedCourses(prev => prev.filter(c => c.code !== code));
    setToast(`Removed ${code}`);
    setTimeout(() => setToast(null), 3000);
  };

  const dayWidthPct = 100 / DAY_KEYS.length;

  return (
    <div className="min-h-screen bg-slate-50 p-6 font-sans text-slate-900">
      {/* Dashboard Layout Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr_320px]">
        
        {/* Left Column: Status */}
        <div className="space-y-4">
          <Card className="p-4">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <CheckCircle2 className="h-4 w-4 text-blue-500" />
              Schedule Status
            </div>
            <div className="mt-3 grid gap-3 text-sm text-slate-600">
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-2">
                <span>Selected</span>
                <span className="font-medium text-slate-900">{selectedCourses.length}</span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-3 py-2">
                <span>Conflicts</span>
                <span className={`font-medium ${conflictCount ? "text-rose-600" : "text-emerald-600"}`}>
                  {conflictCount}
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-2xl border border-dashed border-slate-200 bg-slate-50 px-3 py-3 text-xs leading-5 text-slate-500">
                <AlertTriangle className="h-4 w-4 shrink-0 text-amber-500" />
                Timetable uses proper time-to-pixel positioning.
              </div>
            </div>
          </Card>
        </div>

        {/* Center Column: The Visual Grid */}
        <div className="space-y-4">
          {toast && (
            <div className="animate-in fade-in slide-in-from-top-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm shadow-sm text-blue-600 font-medium">
              {toast}
            </div>
          )}
          
          <Card className="relative overflow-hidden border-none shadow-md">
            <div className="overflow-x-auto">
              <div className="relative flex min-w-[700px] bg-white">
                {/* Time Axis labels could go here */}
                <div className="flex-1 relative">
                  {/* Background Grid Lines */}
                  <div className="flex">
                    {DAY_KEYS.map((day) => (
                      <div key={day} className="flex-1 border-r border-slate-100 last:border-r-0">
                        <div className="py-2 text-center text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
                          {day.slice(0, 3)}
                        </div>
                        {HOURS.map((h) => (
                          <div key={h} className="border-b border-slate-50" style={{ height: 60 * PX_PER_MINUTE }} />
                        ))}
                      </div>
                    ))}
                  </div>

                  {/* Absolute Positioned Course Blocks */}
                  {selectedCourses.map((block, idx) => {
                    const dayIndex = DAY_KEYS.indexOf(block.day);
                    const start = timeToMinutes(block.start);
                    const end = timeToMinutes(block.end);
                    const top = (start - START_MINUTES) * PX_PER_MINUTE + 32; // +32 for header offset
                    const height = (end - start) * PX_PER_MINUTE;
                    const left = `${dayIndex * dayWidthPct}%`;

                    return (
                      <div
                        key={`${block.code}-${idx}`}
                        className="absolute overflow-hidden rounded-xl px-3 py-2 text-white shadow-md ring-1 ring-black/5 transition-transform hover:scale-[1.02] z-10 bg-blue-600"
                        style={{ 
                          left: `calc(${left} + 4px)`, 
                          top: top, 
                          width: `calc(${dayWidthPct}% - 8px)`, 
                          height: height 
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <span className="text-[11px] font-bold">{block.code}</span>
                          <button onClick={() => removeCourse(block.code)}>
                            <X className="h-3 w-3 opacity-70 hover:opacity-100" />
                          </button>
                        </div>
                        <div className="text-[10px] leading-tight mt-1 opacity-90">{block.title}</div>
                        <div className="absolute bottom-1 right-2 text-[9px] font-medium opacity-70">{block.start}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: List View & Notes */}
        <div className="space-y-4">
          <Card className="p-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-semibold">Selected Courses</h3>
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600">
                {selectedCourses.length}
              </span>
            </div>
            <div className="space-y-3">
              {selectedCourses.map((course) => (
                <div key={course.code} className="group rounded-2xl border border-slate-100 bg-slate-50 p-3 hover:border-blue-200 transition-colors">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-sm font-semibold text-slate-800">{course.code}</div>
                      <div className="text-xs text-slate-500">{course.title}</div>
                    </div>
                    <button 
                      onClick={() => removeCourse(course.code)} 
                      className="rounded-full p-1 text-slate-300 hover:bg-white hover:text-rose-500"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                    <span>{course.instructor}</span>
                    <span className="font-medium text-blue-500">{course.day}</span>
                  </div>
                </div>
              ))}
              {selectedCourses.length === 0 && (
                <div className="py-8 text-center text-xs text-slate-400 italic">No courses added.</div>
              )}
            </div>
          </Card>

          <Card className="p-4 bg-slate-900 text-white border-none">
            <div className="flex items-center gap-2 text-sm font-semibold">
              <Settings className="h-4 w-4 text-blue-400" />
              Quick Notes
            </div>
            <p className="mt-2 text-xs leading-5 text-slate-400">
              This layout mirrors a real scheduler dashboard. You can add conflict detection logic to highight overlapping time blocks automatically.
            </p>
          </Card>
        </div>

      </div>
    </div>
  );
}