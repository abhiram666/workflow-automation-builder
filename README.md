# workflow-automation-builder

## Prerequisites
- Node.js and npm installed
- npm version: `6.14.10`

## Steps to Run

1. **Clone the Repository:**
```bash
git clone https://github.com/abhiram666/workflow-automation-builder.git
```

2. **Navigate to Project Directory:**
```bash
cd workflow-automation-builder
```

3. **Install Dependencies:**
```bash
npm install
```

4. **Run the Application:**
```bash
npm start
```

5. **Open in Browser:**
- Visit [http://localhost:3000](http://localhost:3000)

## 📂 Project Structure
```
src/
├── components/
│   ├── Canvas/
│   │   └── Canvas.jsx
│   ├── NodeConfig/
│   │   └── NodeConfigPanel.jsx
│   ├── DataTable/
│   │   └── DataTable.jsx
│   ├── NodeTypes/
│   │   ├── TaskNode.jsx
│   │   ├── ConditionNode.jsx
│   │   └── NotificationNode.jsx
│   └── UI/
│       ├── Button.jsx
│       └── Panel.jsx
├── hooks/
│   ├── useExportImport.js
│   ├── useUndoRedo.js
│   └── useWorkflowState.js
├── utils/
│   └── nodeUtils.js
├── Pages/
│   └── App.jsx
└── index.js
```

## ⚙️ Architecture Explanation

### 1. **components/**  
Contains all the reusable UI components and custom nodes used in the application.
- **Canvas/**: Responsible for rendering the main workflow canvas.
- **NodeConfig/**: Handles the configuration panel to modify node properties.
- **DataTable/**: Displays the workflow data in a tabular format.
- **NodeTypes/**: Contains different types of nodes:
    - `TaskNode.jsx`: Handles task-related nodes.
    - `ConditionNode.jsx`: Handles condition-related nodes.
    - `NotificationNode.jsx`: Handles notification nodes.
- **UI/**: Contains common UI elements.
    - `Button.jsx`: Custom button component.
    - `Panel.jsx`: Generic panel wrapper for UI sections.

---

### 2. **hooks/**  
Contains custom React hooks to manage core logic:
- `useExportImport.js`: Handles exporting and importing workflow data.
- `useUndoRedo.js`: Provides undo/redo functionality for state changes.
- `useWorkflowState.js`: Manages the global workflow state.

---

### 3. **utils/**  
Contains utility functions that provide reusable logic across the application.
- `nodeUtils.js`: Contains helper functions to manipulate and validate node data.

---

### 4. **Pages/**  
Contains high-level pages of the application.
- `App.jsx`: Main application entry point that orchestrates the entire workflow.

---

### 5. **index.js**  
The main entry file that renders the application to the DOM.

---

✅ This architecture ensures modularity, scalability, and ease of maintenance.