import { useAppStore } from "@/store/appStore";
import { Badge } from "@/components/ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";

const NodeInspector = () => {
  const selectedNodeId = useAppStore(
    (state) => state.selectNodeId
  );

  const selectedNodeData = useAppStore(
    (state) => state.selectedNodeData
  );

  const updateSelectedNodeData = useAppStore(
    (state) => state.updateSelectedNodeData
  );

  const deleteSelectedNode = useAppStore(
    (state) => state.deleteSelectedNode
  );

  const graphNodes = useAppStore(
    (state) => state.graphNodes
  );

  const setGraphNodes = useAppStore(
    (state) => state.setGraphNodes
  );

  const duplicateNode = () => {
    const originalNode = graphNodes.find(
      (node) => node.id === selectedNodeId
    );

    if (!originalNode) return;

    const duplicatedNode = {
      ...originalNode,
      id: Date.now().toString(),

      position: {
        x: originalNode.position.x + 80,
        y: originalNode.position.y + 80,
      },

      data: {
        ...originalNode.data,
        label: `${originalNode.data.label}-copy`,
      },
    };

    setGraphNodes([
      ...graphNodes,
      duplicatedNode,
    ]);
  };

  if (!selectedNodeData) {
  return (
    <div className="w-[320px] bg-black text-white p-5">
      <h2 className="text-2xl font-bold">
        Inspector
      </h2>

      <p>No Node Selected</p>
    </div>
  );
}

  return (
  <div className="w-[320px] bg-black border-l border-slate-800 p-6 overflow-y-auto text-white">
    <h2 className="font-bold text-3xl mb-4">
      Inspector
    </h2>

    <Badge
      className={
        selectedNodeData.status === "healthy"
          ? "bg-green-500 text-white mb-4"
          : selectedNodeData.status === "degraded"
          ? "bg-yellow-500 text-black mb-4"
          : "bg-red-500 text-white mb-4"
      }
    >
      {selectedNodeData.status}
    </Badge>

    <Tabs
      defaultValue="config"
      className="w-full mt-4"
    >
      <TabsList className="grid w-full grid-cols-2 bg-slate-900 rounded-lg">
        <TabsTrigger value="config">
          Config
        </TabsTrigger>

        <TabsTrigger value="runtime">
          Runtime
        </TabsTrigger>
      </TabsList>

      {/* CONFIG TAB */}
      <TabsContent
        value="config"
        className="mt-6"
      >
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-5">
          {/* Node Name */}
          <div>
            <label className="text-sm text-slate-400">
              Node Name
            </label>

            <Input
              className="
                mt-2
                bg-slate-900
                border-slate-700
                text-white
              "
              value={selectedNodeData.label}
              onChange={(e) =>
                updateSelectedNodeData(
                  "label",
                  e.target.value
                )
              }
            />
          </div>

          {/* Status */}
          <div>
            <label className="text-sm text-slate-400">
              Status
            </label>

            <select
              className="
                w-full
                mt-2
                p-2
                rounded-md
                bg-slate-900
                border
                border-slate-700
                text-white
              "
              value={selectedNodeData.status}
              onChange={(e) =>
                updateSelectedNodeData(
                  "status",
                  e.target.value
                )
              }
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
          </div>

          {/* Node ID */}
          <div className="rounded-lg bg-slate-900 border border-slate-800 p-3">
            <p className="text-sm text-slate-400">
              Node ID
            </p>

            <p className="font-medium break-all">
              {selectedNodeId}
            </p>
          </div>

          {/* CPU */}
          <div className="space-y-3">
            <label className="text-sm text-slate-400">
              CPU Usage
            </label>

            <Slider
              value={[selectedNodeData.cpu]}
              max={100}
              step={1}
              onValueChange={(value) =>
                updateSelectedNodeData(
                  "cpu",
                  value[0]
                )
              }
            />

            <Input
              type="number"
              min={0}
              max={100}
              className="
                bg-slate-900
                border-slate-700
                text-white
              "
              value={selectedNodeData.cpu}
              onChange={(e) =>
                updateSelectedNodeData(
                  "cpu",
                  Number(e.target.value)
                )
              }
            />
          </div>

          {/* Memory */}
          <div className="space-y-3">
            <label className="text-sm text-slate-400">
              Memory Usage
            </label>

            <Slider
              value={[
                selectedNodeData.memory,
              ]}
              max={100}
              step={1}
              onValueChange={(value) =>
                updateSelectedNodeData(
                  "memory",
                  value[0]
                )
              }
            />

            <Input
              type="number"
              min={0}
              max={100}
              className="
                bg-slate-900
                border-slate-700
                text-white
              "
              value={
                selectedNodeData.memory
              }
              onChange={(e) =>
                updateSelectedNodeData(
                  "memory",
                  Number(e.target.value)
                )
              }
            />
          </div>

          {/* Buttons */}
          <div className="space-y-3 pt-2">
            <button
              onClick={deleteSelectedNode}
              className="
                w-full
                rounded-lg
                bg-red-600
                p-3
                text-white
                hover:bg-red-700
                transition
              "
            >
              Delete Node
            </button>

            <button
              onClick={duplicateNode}
              className="
                w-full
                rounded-lg
                bg-blue-600
                p-3
                text-white
                hover:bg-blue-700
                transition
              "
            >
              Duplicate Node
            </button>
          </div>
        </div>
      </TabsContent>

      {/* RUNTIME TAB */}
      <TabsContent
        value="runtime"
        className="mt-6"
      >
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 space-y-4">
          <div className="bg-slate-900 rounded-lg p-4">
            <p>
              <strong>Region:</strong>{" "}
              us-east-1
            </p>
          </div>

          <div className="bg-slate-900 rounded-lg p-4">
            <p>
              <strong>Provider:</strong>{" "}
              AWS
            </p>
          </div>

          <div className="bg-slate-900 rounded-lg p-4">
            <p>
              <strong>Status:</strong>{" "}
              {selectedNodeData.status}
            </p>
          </div>

          <div className="bg-slate-900 rounded-lg p-4">
            <p>
              <strong>CPU Usage:</strong>{" "}
              {selectedNodeData.cpu}%
            </p>
          </div>

          <div className="bg-slate-900 rounded-lg p-4">
            <p>
              <strong>Memory Usage:</strong>{" "}
              {selectedNodeData.memory}%
            </p>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  </div>
);
};

export default NodeInspector;