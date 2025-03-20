import React, { useCallback } from "react";
import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";
import ConditionNode from "../NodeTypes/ConditionNode";
import NotificationNode from "../NodeTypes/NotificationNode";
import TaskNode from "../NodeTypes/TaskNode";

const nodeTypes = {
  task: TaskNode,
  condition: ConditionNode,
  notification: NotificationNode,
};

const Canvas = ({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodeClick,
  onDeleteNode,
  onDeleteEdge,
  onSaveHistory,
}) => {
  const handleConnect = useCallback(
    (params) => {
      onConnect(params);
      onSaveHistory();
    },
    [onConnect, onSaveHistory]
  );

  const handleNodeClick = useCallback(
    (event, node) => {
      onNodeClick(event, node);
    },
    [onNodeClick]
  );

  const handleEdgeDelete = useCallback(
    (edge) => {
      onDeleteEdge(edge.id);
      onSaveHistory();
    },
    [onDeleteEdge, onSaveHistory]
  );

  return (
    <div className="h-full w-full bg-gray-50 rounded-lg border border-gray-200">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={handleConnect}
        onNodeClick={handleNodeClick}
        onEdgeClick={(event, edge) => handleEdgeDelete(edge)}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Canvas;
