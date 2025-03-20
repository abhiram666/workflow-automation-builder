import { useCallback } from 'react';
import { useNodesState, useEdgesState, addEdge } from 'reactflow';
import { v4 as uuidv4 } from 'uuid';

export const useWorkflowState = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const createInitialNodeData = (type) => {
    switch (type) {
      case 'task':
        return {
          name: 'New Task',
          assignee: '',
          dueDate: '',
          priority: 'medium',
          description: '',
        };
      case 'condition':
        return {
          name: 'New Condition',
          variable: '',
          operator: 'eq',
          value: '',
        };
      case 'notification':
        return {
          name: 'New Notification',
          recipient: '',
          channel: 'email',
          message: '',
        };
      default:
        return {};
    }
  };

  const addNode = useCallback((type) => {
    const id = uuidv4();
    const newNode = {
      id,
      type,
      position: {
        x: Math.random() * 300,
        y: Math.random() * 300,
      },
      data: createInitialNodeData(type),
    };
    setNodes((nodes) => [...nodes, newNode]);
  }, [setNodes]);

  const updateNode = useCallback((id, data) => {
    setNodes((nodes) =>
      nodes.map((node) =>
        node.id === id ? { ...node, data: { ...node.data, ...data } } : node
      )
    );
  }, [setNodes]);

  const deleteNode = useCallback((id) => {
    setNodes((nodes) => nodes.filter((node) => node.id !== id));
    setEdges((edges) => edges.filter((edge) => edge.source !== id && edge.target !== id));
  }, [setNodes, setEdges]);

  const deleteEdge = useCallback((id) => {
    setEdges((edges) => edges.filter((edge) => edge.id !== id));
  }, [setEdges]);

  const onConnect = useCallback((params) => {
    setEdges((edges) => addEdge({ ...params, id: uuidv4() }, edges));
  }, [setEdges]);

  return {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    addNode,
    updateNode,
    deleteNode,
    deleteEdge,
  };
};