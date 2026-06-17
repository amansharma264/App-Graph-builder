import { Handle, Position } from "@xyflow/react";

const CustomNode = ({ data }: any) => {
  const statusColor =
    data.status === "healthy"
      ? "bg-green-500"
      : data.status === "degraded"
      ? "bg-yellow-500"
      : "bg-red-500";

  const statusText =
    data.status === "healthy"
      ? "Success"
      : data.status === "degraded"
      ? "Warning"
      : "Error";

  const hasAlert =
    data.cpu > 80 ||
    data.memory > 80 ||
    data.status === "down";

  const categoryIcon =
    data.category === "API"
      ? "🔵"
      : data.category === "Database"
      ? "🟣"
      : data.category === "Cache"
      ? "🟢"
      : data.category === "Queue"
      ? "🟠"
      : data.category === "Frontend"
      ? "🩵"
      : "🔴";

  const categoryBorder =
    data.category === "API"
      ? "border-blue-500"
      : data.category === "Database"
      ? "border-purple-500"
      : data.category === "Cache"
      ? "border-green-500"
      : data.category === "Queue"
      ? "border-orange-500"
      : data.category === "Frontend"
      ? "border-cyan-500"
      : "border-red-500";

  return (
    <div
      className={`
        bg-black/95
        text-white
        rounded-2xl
        p-5
        w-[340px]
        border
        ${categoryBorder}
        shadow-2xl
        backdrop-blur-md
      `}
    >
      <Handle
        type="target"
        position={Position.Top}
      />

      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg">
              {data.icon || categoryIcon}
            </span>

            <h3 className="font-bold text-xl">
              {data.label}
            </h3>
          </div>

          <p className="text-[11px] text-slate-400 mt-1">
            {categoryIcon} {data.category}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="border border-green-500 text-green-400 px-2 py-1 rounded text-[10px]">
            $0.03/HR
          </span>

          <button
            className="
              w-8 h-8
              rounded-md
              bg-slate-800
              hover:bg-slate-700
            "
          >
            ⚙️
          </button>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs mb-4">
        <div>CPU: {data.cpu}%</div>
        <div>RAM: {data.memory}%</div>

        <div>Disk: 10 GB</div>
        <div>Region: us-east-1</div>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-2 mb-4">
        <button className="px-3 py-1 rounded bg-white text-black text-xs font-semibold">
          CPU
        </button>

        <button className="px-3 py-1 rounded bg-slate-800 text-xs">
          Memory
        </button>

        <button className="px-3 py-1 rounded bg-slate-800 text-xs">
          Disk
        </button>

        <button className="px-3 py-1 rounded bg-slate-800 text-xs">
          Region
        </button>
      </div>

      {/* Alert */}
      {hasAlert && (
        <div
          className="
            mb-4
            rounded-md
            border
            border-red-500
            bg-red-950/50
            px-3
            py-2
            text-xs
            text-red-400
          "
        >
          ⚠ High Resource Usage Detected
        </div>
      )}

      {/* Progress */}
      <div className="mb-5">
        <div className="flex justify-between text-xs text-slate-400 mb-1">
          <span>CPU Usage</span>
          <span>{data.cpu}%</span>
        </div>

        <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
          <div
            className="
              h-full
              bg-gradient-to-r
              from-cyan-500
              via-green-500
              to-red-500
            "
            style={{
              width: `${data.cpu}%`,
            }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center">
        <span
          className={`
            ${statusColor}
            px-4
            py-1
            rounded
            text-xs
            font-semibold
          `}
        >
          {statusText}
        </span>

        <div className="flex items-center gap-2">
          <span className="bg-slate-800 px-2 py-1 rounded text-xs">
            {data.category}
          </span>

          <span className="text-orange-400 font-bold text-4xl leading-none">
            aws
          </span>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
      />
    </div>
  );
};

export default CustomNode;