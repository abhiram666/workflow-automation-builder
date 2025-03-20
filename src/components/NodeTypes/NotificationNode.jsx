import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';

const NotificationNode = memo(({ data, isConnectable }) => {
  return (
    <div className="p-2 shadow-md rounded-md bg-white border-2 border-green-500">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className="font-bold">
        {data.name || 'New Notification'}
      </div>
      <div className="text-xs">
        {data.channel ? `Channel: ${data.channel}` : 'No channel'}
      </div>
      <div className="text-xs">
        {data.recipient ? `To: ${data.recipient}` : ''}
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
});

export default NotificationNode;