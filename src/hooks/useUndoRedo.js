import { useCallback, useRef, useState } from 'react';

export const useUndoRedo = (initialState) => {
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  
  const historyRef = useRef([]);
  const currentIndexRef = useRef(-1);
  const isHistoryAddingRef = useRef(false);

  // Initialize history with initial state
  if (historyRef.current.length === 0 && initialState) {
    historyRef.current = [{ ...initialState }];
    currentIndexRef.current = 0;
  }

  const addToHistory = useCallback(() => {
    if (isHistoryAddingRef.current) return;
    
    const { nodes, edges } = initialState;
    const newState = {
      nodes: [...nodes],
      edges: [...edges],
    };

    const nextIndex = currentIndexRef.current + 1;
    historyRef.current = historyRef.current.slice(0, nextIndex);
    historyRef.current.push(newState);
    currentIndexRef.current = nextIndex;
    
    setCanUndo(true);
    setCanRedo(false);
  }, [initialState]);

  const undo = useCallback(() => {
    if (currentIndexRef.current <= 0) return;
    
    isHistoryAddingRef.current = true;
    currentIndexRef.current--;
    
    const prevState = historyRef.current[currentIndexRef.current];
    initialState.setNodes(prevState.nodes);
    initialState.setEdges(prevState.edges);
    
    setCanUndo(currentIndexRef.current > 0);
    setCanRedo(true);
    
    setTimeout(() => {
      isHistoryAddingRef.current = false;
    }, 0);
  }, [initialState]);

  const redo = useCallback(() => {
    if (currentIndexRef.current >= historyRef.current.length - 1) return;
    
    isHistoryAddingRef.current = true;
    currentIndexRef.current++;
    
    const nextState = historyRef.current[currentIndexRef.current];
    initialState.setNodes(nextState.nodes);
    initialState.setEdges(nextState.edges);
    
    setCanUndo(true);
    setCanRedo(currentIndexRef.current < historyRef.current.length - 1);
    
    setTimeout(() => {
      isHistoryAddingRef.current = false;
    }, 0);
  }, [initialState]);

  return {
    addToHistory,
    undo,
    redo,
    canUndo,
    canRedo,
  };
};