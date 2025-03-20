import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const TaskNode = memo(({ data, isConnectable }) => {
  return (
    <div className="p-2 shadow-md rounded-md bg-white border-2 border-blue-500">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className="font-bold">
        {data.name || 'New Task'}
      </div>
      <div className="text-xs">
        {data.assignee ? `Assignee: ${data.assignee}` : 'Unassigned'}
      </div>
      <div className="text-xs">
        {data.priority ? `Priority: ${data.priority}` : ''}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
});

export default TaskNode;