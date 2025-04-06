import React, { useState } from 'react';
import './App.css';

// Mock data
const mockTasks = [
  {
    id: 'TASK-1',
    title: 'Implement user authentication',
    description: 'Create a secure authentication system using JWT tokens',
    priority: 'High',
    type: 'Feature'
  },
  {
    id: 'TASK-2',
    title: 'Fix database connection issues',
    description: 'Resolve timeout issues in database connections',
    priority: 'Medium',
    type: 'Bug'
  },
  {
    id: 'TASK-3',
    title: 'Add unit tests',
    description: 'Implement test coverage for core functionality',
    priority: 'Low',
    type: 'Task'
  }
];

const mockTeamMembers = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Backend Developer',
    expertise: ['Authentication', 'Database', 'API Development']
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Frontend Developer',
    expertise: ['React', 'UI/UX', 'Testing']
  },
  {
    id: 3,
    name: 'Mike Johnson',
    role: 'Full Stack Developer',
    expertise: ['Backend', 'Frontend', 'DevOps']
  }
];

function App() {
  const [selectedTask, setSelectedTask] = useState(null);
  const [suggestions, setSuggestions] = useState([]);

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
    // Simulate suggestion generation
    const mockSuggestions = mockTeamMembers.map(member => ({
      member,
      confidence: Math.random() * 100,
      reason: `Based on ${member.expertise.join(', ')} expertise`
    })).sort((a, b) => b.confidence - a.confidence);
    setSuggestions(mockSuggestions);
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Assignment SuggestAI</h1>
      </header>
      
      <div className="app-content">
        <div className="task-list">
          <h2>Unassigned Tasks</h2>
          {mockTasks.map(task => (
            <div 
              key={task.id} 
              className={`task-card ${selectedTask?.id === task.id ? 'selected' : ''}`}
              onClick={() => handleTaskSelect(task)}
            >
              <div className="task-header">
                <span className="task-id">{task.id}</span>
                <span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span>
              </div>
              <h3>{task.title}</h3>
              <p>{task.description}</p>
              <span className="task-type">{task.type}</span>
            </div>
          ))}
        </div>

        <div className="suggestions-panel">
          <h2>Assignment Suggestions</h2>
          {selectedTask ? (
            <div className="suggestions-list">
              {suggestions.map((suggestion, index) => (
                <div key={suggestion.member.id} className="suggestion-card">
                  <div className="suggestion-header">
                    <h3>{suggestion.member.name}</h3>
                    <span className="confidence-score">
                      {suggestion.confidence.toFixed(1)}% match
                    </span>
                  </div>
                  <p className="member-role">{suggestion.member.role}</p>
                  <p className="suggestion-reason">{suggestion.reason}</p>
                  <button className="assign-button">Assign Task</button>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-selection">Select a task to see suggestions</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App; 