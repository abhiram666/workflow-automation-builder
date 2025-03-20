import { useCallback } from 'react';
import { saveAs } from 'file-saver';

export const useExportImport = ({ nodes, edges, setNodes, setEdges }) => {
  const exportWorkflow = useCallback(() => {
    const workflow = {
      nodes,
      edges,
    };
    
    const blob = new Blob([JSON.stringify(workflow, null, 2)], {
      type: 'application/json',
    });
    
    saveAs(blob, 'workflow.json');
  }, [nodes, edges]);

  const importWorkflow = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const workflow = JSON.parse(event.target.result);
          
          if (workflow.nodes && workflow.edges) {
            setNodes(workflow.nodes);
            setEdges(workflow.edges);
          } else {
            alert('Invalid workflow file');
          }
        } catch (error) {
          alert('Error parsing workflow file');
          console.error(error);
        }
      };
      
      reader.readAsText(file);
    };
    
    input.click();
  }, [setNodes, setEdges]);

  return {
    exportWorkflow,
    importWorkflow,
  };
};