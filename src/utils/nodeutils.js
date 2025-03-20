export const getNodeStyle = (type) => {
    switch (type) {
      case 'task':
        return {
          borderColor: '#4f46e5',
          backgroundColor: '#f3f4f6',
        };
      case 'condition':
        return {
          borderColor: '#f97316',
          backgroundColor: '#f3f4f6',
        };
      case 'notification':
        return {
          borderColor: '#10b981',
          backgroundColor: '#f3f4f6',
        };
      default:
        return {
          borderColor: '#64748b',
          backgroundColor: '#f3f4f6',
        };
    }
  };
  
  export const getNodeLabel = (type) => {
    switch (type) {
      case 'task':
        return 'Task';
      case 'condition':
        return 'Condition';
      case 'notification':
        return 'Notification';
      default:
        return 'Node';
    }
  };