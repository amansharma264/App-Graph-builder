import {
  Database,
  Server,
  Box,
  Layers3,
  HardDrive,
  Circle,
} from "lucide-react";

const LeftRail = () => {
  const items = [
    Circle,
    Database,
    Server,
    HardDrive,
    Box,
    Layers3,
  ];

  return (
    <div className="w-16 bg-black border-r border-slate-800 flex flex-col items-center py-4 gap-4">
      {items.map((Icon, index) => (
        <button
          key={index}
          className="w-10 h-10 flex items-center justify-center rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-300"
        >
          <Icon size={18} />
        </button>
      ))}
    </div>
  );
};

export default LeftRail;