import { useMemo, useState } from "react";
import { Building2, MapPinned, Search } from "lucide-react";
import Card from "../../components/Card";
import { BUILDINGS } from "../../data/buildings";

export default function ClassroomsPage() {
  const [query, setQuery] = useState("");
  const [selectedBuilding, setSelectedBuilding] = useState("");

  const matchingBuildings = useMemo(() => {
    const q = query.trim().toLowerCase();
    return Object.keys(BUILDINGS).filter((building) => building.toLowerCase().includes(q));
  }, [query]);

  return (
    <div className="mx-auto grid max-w-[1680px] gap-4 px-4 py-5 sm:px-6 lg:grid-cols-[380px_1fr] lg:px-8">
      <Card className="p-4 sm:p-6">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-slate-900 p-3 text-white">
            <MapPinned className="h-5 w-5" />
          </div>
          <div>
            <div className="text-xl font-semibold">Classroom Finder</div>
            <div className="text-sm text-slate-500">Search a building, then select a room.</div>
          </div>
        </div>

        <div className="relative mt-5">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedBuilding("");
            }}
            placeholder="Search a building..."
            className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-slate-300 focus:shadow-sm"
          />
        </div>

        <div className="mt-4 space-y-2">
          {matchingBuildings.map((building) => (
            <button
              key={building}
              onClick={() => setSelectedBuilding(building)}
              className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
                selectedBuilding === building ? "border-slate-900 bg-slate-900 text-white" : "border-slate-200 bg-slate-50 hover:bg-slate-100"
              }`}
            >
              <div className="text-sm font-semibold">{building}</div>
              <div className={`text-xs ${selectedBuilding === building ? "text-slate-200" : "text-slate-500"}`}>
                {BUILDINGS[building].length} available rooms
              </div>
            </button>
          ))}

          {matchingBuildings.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
              No matching building found.
            </div>
          ) : null}
        </div>
      </Card>

      <Card className="p-4 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-lg font-semibold">Available Rooms</div>
            <div className="text-sm text-slate-500">{selectedBuilding ? `${selectedBuilding} rooms` : "Choose a building to display rooms."}</div>
          </div>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">Live list</span>
        </div>

        {selectedBuilding ? (
          <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {BUILDINGS[selectedBuilding].map((room, index) => (
              <div key={room} className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                <div className="flex items-center justify-between gap-2">
                  <div>
                    <div className="text-lg font-semibold">Room {room}</div>
                    <div className="text-sm text-slate-500">Slot #{index + 1}</div>
                  </div>
                  <div className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs text-emerald-700">Available</div>
                </div>
                <div className="mt-4 text-sm leading-6 text-slate-600">Standard classroom equipped for scheduler-friendly room assignment.</div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-5 flex min-h-[320px] items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
            <div>
              <Building2 className="mx-auto h-10 w-10 text-slate-400" />
              <div className="mt-4 text-lg font-semibold">No building selected</div>
              <div className="mt-1 text-sm text-slate-500">Use the search bar to pick a building and reveal its available rooms.</div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
