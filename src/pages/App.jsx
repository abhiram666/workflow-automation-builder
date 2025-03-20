import React, { useState } from 'react';
import Canvas from '../components/Canvas/Canvas';
import NodeConfigPanel from '../components/NodeConfig/NodeConfig';
import DataTable from '../components/DataTable/DataTable';
import { useWorkflowState } from '../hooks/useWorkFlowState';
import { useUndoRedo } from '../hooks/useUndoRedo';
import { useExportImport } from '../hooks/useExportImport';
import { Button } from '../components/UI/Button';

function App() {
  const [selectedNode, setSelectedNode] = useState(null);
  const { 
    nodes, 
    edges, 
    onNodesChange, 
    onEdgesChange, 
    onConnect, 
    addNode, 
    updateNode, 
    deleteNode, 
    deleteEdge 
  } = useWorkflowState();
  
  const { undo, redo, canUndo, canRedo, addToHistory } = useUndoRedo({ nodes, edges,setNodes: (newNodes) => {
    onNodesChange(newNodes.map(node => ({ type: 'reset', item: node })));
  }, setEdges: (newEdges) => {
    onEdgesChange(newEdges.map(edge => ({ type: 'reset', item: edge })));
  } });
  const { exportWorkflow, importWorkflow } = useExportImport({ nodes, edges, setNodes: (newNodes) => {
    onNodesChange(newNodes.map(node => ({ type: 'reset', item: node })));
  }, setEdges: (newEdges) => {
    onEdgesChange(newEdges.map(edge => ({ type: 'reset', item: edge })));
  }});

  const handleNodeClick = (event, node) => {
    setSelectedNode(node);
  };

  const handleClosePanel = () => {
    setSelectedNode(null);
  };

  const handleSaveNodeConfig = (data) => {
    updateNode(selectedNode.id, data);
    addToHistory();
    setSelectedNode(null);
  };

  const handleAddNode = (type) => {
    addNode(type);
    addToHistory();
  };

  const handleDeleteNode = (nodeId) => {
    deleteNode(nodeId);
    addToHistory();
    if (selectedNode && selectedNode.id === nodeId) {
      setSelectedNode(null);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white shadow-sm p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Workflow Automation Builder</h1>
          <div className="flex gap-2">
            <Button onClick={() => handleAddNode('task')} variant="primary">
              Add Task
            </Button>
            <Button onClick={() => handleAddNode('condition')} variant="primary">
              Add Condition
            </Button>
            <Button onClick={() => handleAddNode('notification')} variant="primary">
              Add Notification
            </Button>
            <Button onClick={undo} disabled={!canUndo} variant="secondary">
              Undo
            </Button>
            <Button onClick={redo} disabled={!canRedo} variant="secondary">
              Redo
            </Button>
            <Button onClick={exportWorkflow} variant="secondary">
              Export
            </Button>
            <Button onClick={importWorkflow} variant="secondary">
              Import
            </Button>
          </div>
        </div>
      </header>
      
      <div className="flex flex-grow overflow-hidden">
        <div className="flex-grow flex flex-col">
          <div className="flex-grow p-4 overflow-hidden">
            <Canvas
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={handleNodeClick}
              onDeleteNode={handleDeleteNode}
              onDeleteEdge={deleteEdge}
              onSaveHistory={addToHistory}
            />
          </div>
          <div className="p-4 bg-white shadow-sm">
            <DataTable nodes={nodes} onDeleteNode={handleDeleteNode} onEditNode={handleNodeClick} />
          </div>
        </div>
        
        {selectedNode && (
          <NodeConfigPanel
            node={selectedNode}
            onClose={handleClosePanel}
            onSave={handleSaveNodeConfig}
          />
        )}
      </div>
    </div>
  );
}

export default App;