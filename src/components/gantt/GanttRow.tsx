
import React from "react";
import { Task } from "@/types/Task";

interface GanttRowProps {
  task: Task;
}

export const GanttRow: React.FC<GanttRowProps> = ({ task }) => {
  return (
    <div className="flex items-center h-8">
      <div className="text-sm w-40 truncate">{task.name}</div>
      <div
        className="bg-blue-500 h-4 rounded"
        style={{ width: task.duration * 10 }}
        title={\`\${task.name}: \${task.duration} dias\`}
      />
    </div>
  );
};
