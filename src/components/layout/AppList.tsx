import { useState } from "react";
import { Search, Plus, ChevronRight } from "lucide-react";

import { useApps } from "@/hooks/useApps";
import { useAppStore } from "@/store/appStore";

const AppList = () => {
  const { data, isLoading, error } = useApps();

  const [search, setSearch] = useState("");

  const selectedAppId = useAppStore(
    (state) => state.selectAppId
  );

  const setSelectedAppId = useAppStore(
    (state) => state.setSelectedAppId
  );

  const filteredApps =
    data?.filter((app) =>
      app.name
        .toLowerCase()
        .includes(search.toLowerCase())
    ) || [];

  return (
    <div className="w-80 bg-black border-r border-slate-800 p-4 text-white">
      <h2 className="font-bold text-2xl mb-6">
        Application
      </h2>

      {/* Search */}
      <div className="flex gap-2 mb-4">
        <div className="flex-1 relative">
          <Search
            size={16}
            className="absolute right-3 top-3 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm outline-none"
          />
        </div>

        <button className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center hover:bg-blue-500">
          <Plus size={18} />
        </button>
      </div>

      {/* Apps */}
      <div className="space-y-3 max-h-[500px] overflow-y-auto">
        {isLoading && (
          <p className="text-slate-400">
            Loading...
          </p>
        )}

        {error && (
          <p className="text-red-500">
            Error loading apps
          </p>
        )}

        {filteredApps.map((app) => (
          <div
            key={app.id}
            onClick={() =>
              setSelectedAppId(app.id)
            }
            className={`flex items-center justify-between rounded-lg p-3 cursor-pointer transition-all border ${
              selectedAppId === app.id
                ? "bg-slate-800 border-blue-500"
                : "bg-slate-900 border-slate-800 hover:border-slate-600"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-violet-600 flex items-center justify-center text-sm font-bold">
                ⚙
              </div>

              <span>{app.name}</span>
            </div>

            <ChevronRight size={16} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppList;