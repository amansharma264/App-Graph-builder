import TopBar from "@/components/layout/TopBar";
import LeftRail from "@/components/layout/LeftRail";
import AppList from "@/components/layout/AppList";
import NodeInspector from "@/components/inspector/NodeInspector";
import GraphCanvas from "@/components/graph/GraphCanvas";
import NodeDetailsDialog from "@/components/NodeDetailsDialog";
import NodeCreationModal from "@/components/NodeCreationModal";
import { useAppStore } from "@/store/appStore";

const Dashboard = () => {

  const isNodeModalOpen = useAppStore(
  (state) => state.isNodeModalOpen
);

const setNodeModalOpen = useAppStore(
  (state) => state.setNodeModalOpen
);
  return (
    <div className="h-screen flex flex-col bg-white dark:bg-slate-950 text-black dark:text-white">
      <TopBar />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Rail - Always Visible */}
        <LeftRail />

        {/* App List - Hide on small screens */}
        <div className="hidden md:block">
          <AppList />
        </div>

        {/* Graph Area */}
        <main className="flex-1 h-full">
          <GraphCanvas />
        </main>

        {/* Inspector - Hide on tablets/mobile */}
        <div className="hidden lg:block">
          <NodeInspector />
        </div>
      </div>
      <NodeDetailsDialog />
      <NodeCreationModal
  open={isNodeModalOpen}
  onClose={() =>
    setNodeModalOpen(false)
  }
/>
    </div>
  );
};

export default Dashboard;