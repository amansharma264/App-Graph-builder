import { useState } from "react";
import { useAppStore } from "@/store/appStore";

interface Props {
  open: boolean;
  onClose: () => void;
}

const NodeCreationModal = ({
  open,
  onClose,
}: Props) => {
  const graphNodes = useAppStore(
    (state) => state.graphNodes
  );

  const setGraphNodes = useAppStore(
    (state) => state.setGraphNodes
  );

  const [label, setLabel] =
    useState("");

  const [status, setStatus] =
    useState("healthy");

  const [cpu, setCpu] =
    useState(20);

  const [memory, setMemory] =
    useState(30);

  const [category, setCategory] =
  useState("API");

  if (!open) return null;

  const createNode = () => {
    const newNode = {
      id: Date.now().toString(),

      type: "custom",

      position: {
        x: 300,
        y: 100 + graphNodes.length * 100,
      },

      data: {
  label:
    label ||
    `service-${graphNodes.length}`,

  status,

  cpu,

  memory,

  category,
},
    };

    setGraphNodes([
      ...graphNodes,
      newNode,
    ]);

    onClose();

    setLabel("");
    setStatus("healthy");
    setCpu(20);
    setMemory(30);
    setCategory("API");
  };

  return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
    <div className="w-[450px] rounded-2xl border border-slate-700 bg-slate-900 p-6 text-white shadow-2xl">
      <h2 className="mb-6 text-2xl font-bold">
        Create Service
      </h2>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Service Name"
          value={label}
          onChange={(e) =>
            setLabel(e.target.value)
          }
          className="
            w-full
            rounded-lg
            border
            border-slate-700
            bg-slate-800
            p-3
            text-white
            outline-none
          "
        />

        <select
          value={status}
          onChange={(e) =>
            setStatus(e.target.value)
          }
          className="
            w-full
            rounded-lg
            border
            border-slate-700
            bg-slate-800
            p-3
            text-white
          "
        >
          <option value="healthy">
            Healthy
          </option>

          <option value="degraded">
            Degraded
          </option>

          <option value="down">
            Down
          </option>
        </select>

        <select
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          className="
            w-full
            rounded-lg
            border
            border-slate-700
            bg-slate-800
            p-3
            text-white
          "
        >
          <option value="API">
            API
          </option>

          <option value="Database">
            Database
          </option>

          <option value="Cache">
            Cache
          </option>

          <option value="Queue">
            Queue
          </option>

          <option value="Frontend">
            Frontend
          </option>

          <option value="Worker">
            Worker
          </option>
        </select>

        <input
          type="number"
          placeholder="CPU %"
          value={cpu}
          onChange={(e) =>
            setCpu(
              Number(e.target.value)
            )
          }
          className="
            w-full
            rounded-lg
            border
            border-slate-700
            bg-slate-800
            p-3
            text-white
          "
        />

        <input
          type="number"
          placeholder="Memory %"
          value={memory}
          onChange={(e) =>
            setMemory(
              Number(e.target.value)
            )
          }
          className="
            w-full
            rounded-lg
            border
            border-slate-700
            bg-slate-800
            p-3
            text-white
          "
        />
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={onClose}
          className="
            rounded-lg
            border
            border-slate-700
            px-4
            py-2
            text-white
          "
        >
          Cancel
        </button>

        <button
          onClick={createNode}
          className="
            rounded-lg
            bg-blue-600
            px-4
            py-2
            text-white
            hover:bg-blue-700
          "
        >
          Create
        </button>
      </div>
    </div>
  </div>
);
};

export default NodeCreationModal;