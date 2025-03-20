export const nodes = [
  { id: '1', type: 'input', data: { label: 'Start' }, position: { x: 250, y: 5 } },
  { id: '2', type: 'default', data: { label: 'Task A' }, position: { x: 250, y: 100 } },
  { id: '3', type: 'default', data: { label: 'Task B' }, position: { x: 450, y: 100 } },
  { id: '4', type: 'output', data: { label: 'End' }, position: { x: 250, y: 200 } },
];

export const edges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e3-4', source: '3', target: '4', animated: true },
];
