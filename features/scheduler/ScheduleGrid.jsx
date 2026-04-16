import React from "react";
import { X } from "lucide-react"; // Common icon library
// Assuming you have a Card component or are using a library like shadcn/ui
const Card = ({ children }) => <div className="bg-white rounded-lg shadow">{children}</div>;

// Constants needed for the math
const PX_PER_MINUTE = 1; 
const START_MINUTES = 480; // 8:00 AM
const DAY_KEYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const dayWidthPct = 100 / DAY_KEYS.length;

export default function CourseScheduler({ scheduleBlocks, onRemoveCourse }) {
  
  // Helper to convert "08:30" to 510
  const timeToMinutes = (timeStr) => {
    const [hrs, mins] = timeStr.split(':').map(Number);
    return hrs * 60 + mins;
  };

  const colorClass = (type) => {
    return type === 'Lecture' ? 'bg-blue-500' : 'bg-purple-500';
  };

  return (
    <Card>
      <div className="relative overflow-auto border border-slate-200 rounded-xl bg-white">
        <div className="min-w-[800px]">
          <div className="relative flex">
            {/* The Grid Background */}
            <div className="flex-1 relative">
              {DAY_KEYS.map((day) => (
                <React.Fragment key={day}>
                  {[...Array(12)].map((_, hour) => (
                    <div 
                      key={`${day}-${hour}`} 
                      className="border-l border-b border-slate-100" 
                      style={{ height: 60 * PX_PER_MINUTE }} 
                    />
                  ))}
                </React.Fragment>
              ))}

              {/* The Dynamic Course Blocks */}
              {scheduleBlocks.map((block) => {
                const dayIndex = DAY_KEYS.indexOf(block.day);
                const start = timeToMinutes(block.start);
                const end = timeToMinutes(block.end);
                const top = (start - START_MINUTES) * PX_PER_MINUTE;
                const height = Math.max((end - start) * PX_PER_MINUTE - 4, 36);
                const left = `calc(${dayIndex} * ${dayWidthPct}%)`;
                const width = `calc(${dayWidthPct}% - 8px)`;

                return (
                  <div
                    key={block.key}
                    className={`absolute overflow-hidden rounded-2xl px-3 py-2 text-white shadow-lg ring-1 ring-black/5 ${colorClass(block.type)} transition-all hover:scale-[1.02]`}
                    style={{ left, top, width, height, marginLeft: 4, zIndex: 10 }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-sm font-semibold leading-tight">{block.code}</div>
                        <div className="text-[10px] opacity-90">
                          {block.start}–{block.end}
                        </div>
                      </div>
                      <button
                        onClick={() => onRemoveCourse(block.code)}
                        className="rounded-full bg-white/15 p-1 text-white/90 hover:bg-white/25"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="mt-1 text-[11px] font-medium leading-tight opacity-95">{block.title}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}