import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  applyNodeChanges,
  type Node,
  type Edge,
  type Connection,
  type NodeChange,
  type ReactFlowInstance,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import CustomNode from "./customNode";

import { useGraph } from "@/hooks/useGraph";
import { useAppStore } from "@/store/appStore";
import { useEffect, useState } from "react";
import dagre from "dagre";
import toast from "react-hot-toast";

const nodeTypes = {
  custom: CustomNode,
};

const GraphCanvas = () => {
  const { data, isLoading, error } = useGraph();

  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const graphNodes = useAppStore(
    (state) => state.graphNodes
  );

  const graphEdges = useAppStore(
    (state) => state.graphEdges
  );

  const setGraphNodes = useAppStore(
    (state) => state.setGraphNodes
  );

  const setGraphEdges = useAppStore(
    (state) => state.setGraphEdges
  );

  const setSelectNodeId = useAppStore(
    (state) => state.setSelectNodeId
  );

  const setSelectedNodeData = useAppStore(
    (state) => state.setSelectedNodeData
  );

  const selectedNodeId = useAppStore(
    (state) => state.selectNodeId
  );

  const selectedNodeData = useAppStore(
    (state) => state.selectedNodeData
  );

  const searchNode = useAppStore(
    (state) => state.searchNode
  );

  const setReactInstance = useAppStore(
    (state)=> state.setReactFlowInstance
  );

  const setNodeModalOpen = useAppStore(
  (state) => state.setNodeModalOpen
);

  const onConnect = (
    connection: Connection
  ) => {
    const updatedEdges = addEdge(
      connection,
      edges
    );

    setEdges(updatedEdges);
    setGraphEdges(updatedEdges);
  };

  const onNodesChange = (
  changes: NodeChange[]
) => {
  const updatedNodes =
    applyNodeChanges(changes, nodes);

  setNodes(updatedNodes);
  setGraphNodes(updatedNodes);
};

  // Initial graph load
  useEffect(() => {
    if (data && graphNodes.length === 0) {
      setNodes(data.nodes);
      setEdges(data.edges);

      setGraphNodes(data.nodes);
      setGraphEdges(data.edges);
    }
  }, [
    data,
    graphNodes.length,
    setGraphNodes,
    setGraphEdges,
  ]);

  // Store -> Canvas Sync

  useEffect(() => {
    setNodes(graphNodes);
  }, [graphNodes]);

  useEffect(() => {
    setEdges(graphEdges);
  }, [graphEdges]);


  // Inspector update
 // Inspector update
// Inspector update
// useEffect(() => {
//   if (
//     !selectedNodeId ||
//     !selectedNodeData
//   ) {
//     return;
//   }

//   setNodes((prev) =>
//     prev.map((node) =>
//       node.id === selectedNodeId
//         ? {
//             ...node,
//             data: selectedNodeData,
//           }
//         : node
//     )
//   );
// }, [
//   selectedNodeId,
//   selectedNodeData,
// ]);

  // Search node
  useEffect(() => {
    if (!searchNode.trim()) {
      return;
    }

    const foundNode = nodes.find(
      (node) =>
        node.data?.label
          ?.toLowerCase()
          .includes(
            searchNode.toLowerCase()
          )
    );

    if (foundNode) {
      setSelectNodeId(foundNode.id);
      setSelectedNodeData(
        foundNode.data
      );
    }
  }, [
    searchNode,
    nodes,
    setSelectNodeId,
    setSelectedNodeData,
  ]);

  useEffect(() => {
  const interval = setInterval(() => {
    const updatedNodes = graphNodes.map(
      (node) => {
        const cpu = Math.floor(
          Math.random() * 100
        );

        const memory = Math.floor(
          Math.random() * 100
        );

        let status = "healthy";

        if (cpu > 90) {
  status = "down";

  toast.error(
    `${node.data.label} CPU Critical (${cpu}%)`,
    {
      id: node.id,
    }
  );
}

else if (cpu > 70) {
  status = "degraded";
}

        return {
          ...node,
          data: {
            ...node.data,
            cpu,
            memory,
            status,
          },
        };
      }
    );

    setGraphNodes(updatedNodes);
  }, 3000);

  return () => clearInterval(interval);
}, [graphNodes, setGraphNodes]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        Loading Graph...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full text-red-500">
        Failed to load graph
      </div>
    );
  }

  return (
    <div 
    id="graph-container"
    className="w-full h-full">
      <ReactFlow
  nodes={nodes}
  edges={edges}
  nodeTypes={nodeTypes}
  fitView
  fitViewOptions={{
    padding: 0.4,
  }}
  onInit={(
    instance: ReactFlowInstance
  ) => {
    setReactInstance(instance);
  }}
  onConnect={onConnect}
  onNodesChange={onNodesChange}
  deleteKeyCode={[
    "Backspace",
    "Delete",
  ]}
  onNodeClick={(_, node) => {
  setSelectNodeId(node.id);

  setSelectedNodeData({
    ...node.data,
  });

  console.log(
    "NODE CLICKED",
    node.data
  );
}}
  onNodeDoubleClick={(_, node) => {
    setSelectedNodeData(node.data);
    setNodeModalOpen(true);
  }}
  onNodesDelete={(deletedNodes) => {
    const deletedIds =
      deletedNodes.map(
        (node) => node.id
      );

    const updatedNodes =
      graphNodes.filter(
        (node) =>
          !deletedIds.includes(
            node.id
          )
      );

    setGraphNodes(updatedNodes);

    if (
      selectedNodeId &&
      deletedIds.includes(
        selectedNodeId
      )
    ) {
      setSelectNodeId(null);
      setSelectedNodeData(null);
    }
  }}
  onEdgesDelete={(deletedEdges) => {
    const deletedIds =
      deletedEdges.map(
        (edge) => edge.id
      );

    const updatedEdges =
      graphEdges.filter(
        (edge) =>
          !deletedIds.includes(
            edge.id
          )
      );

    setGraphEdges(updatedEdges);
  }}
>
  <Background
    gap={20}
    size={1}
  />

  <MiniMap
    zoomable
    pannable
    style={{
      width: 180,
      height: 120,
      backgroundColor: "#0f172a",
    }}
  />

  <Controls />
</ReactFlow>
    </div>
  );
};

export default GraphCanvas;