import { create } from "zustand";

interface AppStore {
  selectAppId: string | null;
  selectNodeId: string | null;

  selectedNodeData: any | null;

  isMobilePanelOpen: boolean;

  activeInspectorTab: string;

  graphNodes: any[];
  graphEdges: any[];

  searchNode: string;

  reactFlowInstance: any;

  isNodeModalOpen: boolean;

  setSelectedAppId: (
    id: string
  ) => void;

  setSelectNodeId: (
    id: string | null
  ) => void;

  setSelectedNodeData: (
    data: any
  ) => void;

  deleteSelectedNode: () => void;

  updateSelectedNodeData: (
    field: string,
    value: number | string
  ) => void;

  setMobilePanelOpen: (
    open: boolean
  ) => void;

  setActiveInspectorTab: (
    tab: string
  ) => void;

  setGraphNodes: (
    nodes: any[]
  ) => void;

  setGraphEdges: (
    edges: any[]
  ) => void;

  setReactFlowInstance: (
    instance: any
  ) => void;

  setSearchNode: (
    value: string
  ) => void;

  setNodeModalOpen: (
    open: boolean
  ) => void;
}

export const useAppStore =
  create<AppStore>((set) => ({
    selectAppId: "1",

    selectNodeId: null,

    selectedNodeData: null,

    isMobilePanelOpen: false,

    activeInspectorTab: "config",

    graphNodes: [],

    graphEdges: [],

    searchNode: "",

    reactFlowInstance: null,

    isNodeModalOpen: false,

    setSelectedAppId: (id) =>
      set({
        selectAppId: id,
      }),

    setSelectNodeId: (id) =>
      set({
        selectNodeId: id,
      }),

    setSelectedNodeData: (data) =>
      set({
        selectedNodeData: data,
      }),

    updateSelectedNodeData: (
      field,
      value
    ) =>
      set((state) => ({
        selectedNodeData:
          state.selectedNodeData
            ? {
                ...state.selectedNodeData,
                [field]: value,
              }
            : null,
      })),

    deleteSelectedNode: () =>
      set({
        selectNodeId: null,
        selectedNodeData: null,
        isNodeModalOpen: false,
      }),

    setMobilePanelOpen: (open) =>
      set({
        isMobilePanelOpen: open,
      }),

    setActiveInspectorTab: (tab) =>
      set({
        activeInspectorTab: tab,
      }),

    setGraphNodes: (nodes) =>
      set({
        graphNodes: nodes,
      }),

    setGraphEdges: (edges) =>
      set({
        graphEdges: edges,
      }),

    setSearchNode: (value) =>
      set({
        searchNode: value,
      }),

    setReactFlowInstance: (
      instance
    ) =>
      set({
        reactFlowInstance:
          instance,
      }),

    setNodeModalOpen: (open) =>
      set({
        isNodeModalOpen: open,
      }),
  }));