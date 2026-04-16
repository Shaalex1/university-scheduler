import { useMemo, useState } from "react";
import { Search, BookOpen, Clock3, CalendarDays, Plus, Check } from "lucide-react";
import { COURSES } from "../../data/courses";

// Card component
const Card = ({ children, className = "" }) => (
  <div className={`rounded-3xl border border-slate-200 bg-white shadow-sm ${className}`}>
    {children}
  </div>
);

export default function CoursesPage({ allCourses = COURSES, selectedCodes, setSelectedCodes }) {
  const [searchQuery, setSearchQuery] = useState("");

  // Professional Search Logic: Filters by Code, Title, or Instructor
  const filtered = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return allCourses.filter(course => 
      course.code.toLowerCase().includes(query) ||
      course.title.toLowerCase().includes(query) ||
      course.instructor.toLowerCase().includes(query)
    );
  }, [searchQuery, allCourses]);

  // Helper to format "09:00" to "9:00 AM" (optional but looks pro)
  const formatTime = (time) => {
    const [h, m] = time.split(':');
    const hh = parseInt(h);
    const suffix = hh >= 12 ? 'PM' : 'AM';
    const hour12 = hh % 12 || 12;
    return `${hour12}:${m} ${suffix}`;
  };

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-none shadow-sm">
        <div className="border-b border-slate-100 bg-slate-50/50 p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-bold">Available Courses</h2>
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by code, title, instructor..."
                className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              />
            </div>
          </div>
        </div>

        {/* The Grid of Course Cards */}
        <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 sm:p-6">
          {filtered.map((course) => {
            const isSelected = selectedCodes.includes(course.code);
            return (
              <div 
                key={course.code} 
                className={`rounded-3xl border transition-all duration-200 p-5 ${
                  isSelected ? 'border-blue-200 bg-blue-50/30' : 'border-slate-200 bg-slate-50 hover:shadow-md hover:-translate-y-1'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-base font-semibold text-slate-900">{course.code}</div>
                    <div className="mt-1 text-xs font-medium text-slate-500 uppercase tracking-tight">
                      {course.title}
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-slate-500 shadow-sm ring-1 ring-slate-100">
                    {course.credits} CR
                  </span>
                </div>

                <div className="mt-5 space-y-2.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-3.5 w-3.5 text-slate-400" /> 
                    <span className="truncate">{course.department}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock3 className="h-3.5 w-3.5 text-slate-400" /> 
                    <span className="font-medium">
                      {course.sessions.map((s) => `${s.day.slice(0,3)} ${s.start}`).join(" • ")}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
                  <div className="text-xs font-medium text-slate-500">{course.instructor}</div>
                  <button
                    onClick={() => setSelectedCodes((prev) => (prev.includes(course.code) ? prev.filter(c => c !== course.code) : [...prev, course.code]))}
                    className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all ${
                      isSelected 
                        ? "bg-blue-600 text-white shadow-md shadow-blue-200" 
                        : "bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {isSelected ? <Check className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                    {isSelected ? "Added" : "Add"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}