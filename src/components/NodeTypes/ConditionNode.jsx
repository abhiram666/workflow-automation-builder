import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const ConditionNode = memo(({ data, isConnectable }) => {
  return (
    <div className="p-2 shadow-md rounded-md bg-white border-2 border-orange-500">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className="font-bold">
        {data.name || 'New Condition'}
      </div>
      <div className="text-xs">
        {data.variable && data.operator && data.value
          ? `${data.variable} ${data.operator} ${data.value}`
          : 'Unconfigured condition'}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={{ left: '30%' }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={{ left: '70%' }}
        isConnectable={isConnectable}
      />
    </div>
  );
});

export default ConditionNode;