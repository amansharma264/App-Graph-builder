import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useAppStore } from "@/store/appStore";

const NodeDetailsDialog = () => {
  const isOpen = useAppStore(
    (state) => state.isNodeModalOpen
  );

  const setOpen = useAppStore(
    (state) => state.setNodeModalOpen
  );

  const node = useAppStore(
    (state) => state.selectedNodeData
  );

  if (!node) return null;

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setOpen}
    >
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            Service Details
          </DialogTitle>
        </DialogHeader>

        <div className="mt-4 rounded-lg border p-4 space-y-3">
          <p>
            <strong>Name:</strong>{" "}
            {node.label}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span
              className={
                node.status === "healthy"
                  ? "text-green-500 font-semibold"
                  : node.status === "degraded"
                  ? "text-yellow-500 font-semibold"
                  : "text-red-500 font-semibold"
              }
            >
              {node.status}
            </span>
          </p>

          <p>
            <strong>CPU:</strong>{" "}
            {node.cpu}%
          </p>

          <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
            <div
              className="h-full bg-blue-500"
              style={{
                width: `${node.cpu}%`,
              }}
            />
          </div>

          <p>
            <strong>Memory:</strong>{" "}
            {node.memory}%
          </p>

          <div className="w-full h-2 bg-gray-200 rounded overflow-hidden">
            <div
              className="h-full bg-green-500"
              style={{
                width: `${node.memory}%`,
              }}
            />
          </div>

          <p>
            <strong>Region:</strong>{" "}
            us-east-1
          </p>

          <p>
            <strong>Provider:</strong>{" "}
            AWS
          </p>

          <p>
            <strong>Monthly Cost:</strong>{" "}
            $21.60
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NodeDetailsDialog;