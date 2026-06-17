import { useAppStore } from "@/store/appStore";
import { useState, ChangeEvent } from "react";
import { toPng } from "html-to-image";
import dagre from "dagre";

const TopBar = () => {
  const [search, setSearch] = useState("");

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

  const setSearchNode = useAppStore(
    (state) => state.setSearchNode
  );

  const reactFlowInstance = useAppStore(
    (state)=> state.reactFlowInstance
  );

  const addNewService = () => {
    const nodeCount = graphNodes.length;

    const newNode = {
      id: Date.now().toString(),

      type: "custom",

      position: {
        x: 300,
        y: 100 + nodeCount * 100,
      },

      data: {
        label: `service-${nodeCount}`,
        status: "healthy",
        cpu: 20,
        memory: 30,
      },
    };

    setGraphNodes([
      ...graphNodes,
      newNode,
    ]);
  };

  const saveGraph = () => {
    const graph = {
      nodes: graphNodes,
      edges: graphEdges,
    };

    localStorage.setItem(
      "graph",
      JSON.stringify(graph)
    );

    const blob = new Blob(
      [
        JSON.stringify(
          graph,
          null,
          2
        ),
      ],
      {
        type: "application/json",
      }
    );

    const url =
      window.URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;
    a.download = "graph.json";
    a.click();

    window.URL.revokeObjectURL(url);

    alert("Graph Saved!");
  };

  const loadGraph = () => {
    const savedGraph =
      localStorage.getItem("graph");


    if (!savedGraph) {
      alert("No saved graph found");
      return;
    }

    const graph =
      JSON.parse(savedGraph);

    setGraphNodes(
      graph.nodes || []
    );

    setGraphEdges(
      graph.edges || []
    );

    alert("Graph Loaded!");
  };

  const importGraph = (
  event: ChangeEvent<HTMLInputElement>
) => {
  const file = event.target.files?.[0];

  if (!file) return;

  const reader = new FileReader();

  reader.onload = (e) => {
    try {
      const graph = JSON.parse(
        e.target?.result as string
      );

      setGraphNodes(
        graph.nodes || []
      );

      setGraphEdges(
        graph.edges || []
      );

      alert(
        "Graph Imported Successfully!"
      );
    } catch (error) {
      console.error(error);

      alert("Invalid JSON File");
    }
  };

  reader.readAsText(file);
};

  const fitViewGraph = () =>{
        if(!reactFlowInstance){
          return;
        }
        reactFlowInstance.fitView({
          padding:0.2,
          duration:800,
        })
      }
      const autoArrange = () => {
  const dagreGraph = new dagre.graphlib.Graph();

  dagreGraph.setDefaultEdgeLabel(
    () => ({})
  );

  dagreGraph.setGraph({
    rankdir: "TB",
  });

  graphNodes.forEach((node) => {
    dagreGraph.setNode(node.id, {
      width: 180,
      height: 80,
    });
  });

  graphEdges.forEach((edge) => {
    dagreGraph.setEdge(
      edge.source,
      edge.target
    );
  });

  dagre.layout(dagreGraph);

  const layoutedNodes =
    graphNodes.map((node) => {
      const position =
        dagreGraph.node(node.id);

      return {
        ...node,
        position: {
          x: position.x - 90,
          y: position.y - 40,
        },
      };
    });

  setGraphNodes(layoutedNodes);

  setTimeout(() => {
    reactFlowInstance?.fitView({
      padding: 0.2,
      duration: 800,
    });
  }, 100);
};

const toggleTheme = () => {
  const isDark =
    document.documentElement.classList.toggle(
      "dark"
    );

  localStorage.setItem(
    "theme",
    isDark ? "dark" : "light"
  );
};

  const exportPNG = async () => {
    const element =
      document.getElementById(
        "graph-container"
      );

    if (!element) {
      alert("Graph not found");
      return;
    }

    try {
      const dataUrl =
        await toPng(element);

      const link =
        document.createElement("a");

      link.download = "graph.png";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error(error);

      alert(
        "Failed to export graph"
      );
    }
  };

 return (
  <div>
    <header className="h-16 border-b border-slate-800 px-6 flex items-center justify-between bg-black text-white">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center font-bold">
          A
        </div>

        <h1 className="font-bold text-xl">
          App Graph Builder
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Search node..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setSearchNode(e.target.value);
          }}
          className="bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-sm w-56"
        />

        <span className="text-sm text-slate-400">
          Nodes: {graphNodes.length}
        </span>

        <span className="text-sm text-slate-400">
          Edges: {graphEdges.length}
        </span>

        <button
          onClick={() =>
            useAppStore
              .getState()
              .setNodeModalOpen(true)
          }
          className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm"
        >
          + Add Service
        </button>

        <button
          onClick={fitViewGraph}
          className="border border-slate-700 px-4 py-2 rounded-lg text-sm"
        >
          Fit View
        </button>

        <button
          onClick={autoArrange}
          className="border border-slate-700 px-4 py-2 rounded-lg text-sm"
        >
          Auto Arrange
        </button>
      </div>
    </header>
  </div>
);

};

export default TopBar;