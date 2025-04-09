import React, { useState } from 'react';
import './App.css';

// Transform JSON data into tasks format
const tasks = Object.entries(
  {
    "FISCDSOL-82544": {
        "summary": "CH Template : Fail in CCP Account Group",
        "issuetype": "Bug",
        "status": "to do",
        "priority": "Critical",
        "top_people": [
            {
                "person": "Hassan, Hamdi",
                "average_score": 0.9,
                "relevant_summaries": [
                    {
                        "summary": "CH Template : Fail in CCP Account Group",
                        "score": 1.0
                    }
                ]
            },
            {
                "person": "MohamedAloui Fathallah",
                "average_score": 0.5740464873164326,
                "relevant_summaries": [
                    {
                        "summary": "CH Template : Account Group : Remove Capitalization ",
                        "score": 0.5155017147300983
                    },
                    {
                        "summary": "CH Template : Account Group Allocation : Validation",
                        "score": 0.6024165835556816
                    },
                    {
                        "summary": "CH Template : Clearing Account: Group Allocation",
                        "score": 0.6042211636635177
                    }
                ]
            }
        ]
    },
    "FISCDSOL-82426": {
        "summary": "Template UBIX : Account Relationships are not migrated to FCD",
        "issuetype": "Bug",
        "status": "to do",
        "priority": "Major",
        "top_people": []
    },
    "FISCDSOL-82306": {
        "summary": "Export based API jobs not showing an error when a crash happens in server after some data has already been sent",
        "issuetype": "Bug",
        "status": "to do",
        "priority": "Critical",
        "top_people": [
            {
                "person": "Riadh Arous",
                "average_score": 0.9,
                "relevant_summaries": [
                    {
                        "summary": "Export based API jobs not showing an error when a crash happens in server after some data has already been sent",
                        "score": 1.0
                    }
                ]
            }
        ]
    },
    "FISCDSOL-81812": {
        "summary": "CH Template : Placeholder : Account Validation : Fix The Management of the same inbound Alias",
        "issuetype": "Bug",
        "status": "to do",
        "priority": "Major",
        "top_people": [
            {
                "person": "Hassan, Hamdi",
                "average_score": 0.9,
                "relevant_summaries": [
                    {
                        "summary": "CH Template : Placeholder : Account Validation : Fix The Management of the same inbound Alias",
                        "score": 1.0
                    }
                ]
            }
        ]
    },
    "FISCDSOL-81811": {
        "summary": "CH CV-GMI : [TS 3665265] : Account Validation : Fix The Management of the same inbound Alias",
        "issuetype": "Bug",
        "status": "to do",
        "priority": "Major",
        "top_people": [
            {
                "person": "Hassan, Hamdi",
                "average_score": 0.6603733716476258,
                "relevant_summaries": [
                    {
                        "summary": "CH Template : Placeholder : Account Validation : Fix The Management of the same inbound Alias",
                        "score": 0.7337481907195842
                    }
                ]
            }
        ]
    }
  }
).map(([id, data]) => ({
  id,
  title: data.summary,
  description: data.summary, // Using summary as description since we don't have separate descriptions
  priority: data.priority,
  type: data.issuetype,
  status: data.status,
  top_people: data.top_people
}));

function App() {
  const [selectedTask, setSelectedTask] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleTaskSelect = (task) => {
    setSelectedTask(task);
    setIsProcessing(true);
    setSuggestions([]); // Clear previous suggestions

    // Simulate processing steps
    setTimeout(() => {
      const suggestions = task.top_people.map(person => ({
        member: {
          id: person.person,
          name: person.person,
          role: "Team Member",
          expertise: person.relevant_summaries.map(s => s.summary)
        },
        confidence: person.average_score * 100,
        reason: `Based on ${person.relevant_summaries.length} similar task(s) with average match score of ${(person.average_score * 100).toFixed(1)}%`
      })).sort((a, b) => b.confidence - a.confidence);

      setSuggestions(suggestions);
      setIsProcessing(false);
    }, 2500);
  };

  const handleProposeAssignment = (task, suggestion) => {
    // Email recipients
    const to = ['souhaib.sfaxi@fisglobal.com', 'elyes.fessi@gmail.com'];
    
    // Create email subject
    const subject = `Task Assignment Proposal: ${task.id}`;
    
    // Create email body in HTML format
    const emailBody = `
      <html>
        <body>
          <h1>Task Assignment Proposal</h1>
          
          <h2>Task Details</h2>
          <p><strong>Task ID:</strong> ${task.id}</p>
          <p><strong>Title:</strong> ${task.title}</p>
          <p><strong>Type:</strong> ${task.type}</p>
          <p><strong>Priority:</strong> ${task.priority}</p>
          <p><strong>Status:</strong> ${task.status}</p>
          
          <h2>Suggested Assignee</h2>
          <p><strong>Name:</strong> ${suggestion.member.name}</p>
          <p><strong>Confidence Score:</strong> ${suggestion.confidence.toFixed(1)}%</p>
          <p><strong>Reason:</strong> ${suggestion.reason}</p>
          
          <h3>Similar Tasks History:</h3>
          <ul>
            ${suggestion.member.expertise.map(task => `<li>${task}</li>`).join('')}
          </ul>
          
          <p>Please review this suggestion and take appropriate action.</p>
        </body>
      </html>
    `;

    // Create mailto URL
    const mailtoLink = `mailto:${to.join(',')}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;

    // Open email client
    window.location.href = mailtoLink;
  };

  const renderSuggestionCard = (suggestion) => (
    <div key={suggestion.member.id} className="suggestion-card">
      <div className="suggestion-header">
        <h3>{suggestion.member.name}</h3>
        <span className="confidence-score">
          {suggestion.confidence.toFixed(1)}% match
        </span>
      </div>
      <p className="member-role">{suggestion.member.role}</p>
      <p className="suggestion-reason">{suggestion.reason}</p>
      <div className="similar-tasks">
        <h4>Similar Tasks:</h4>
        <ul>
          {suggestion.member.expertise.map((task, idx) => (
            <li key={idx}>{task}</li>
          ))}
        </ul>
      </div>
      <div className="button-group">
        <button 
          className="propose-button"
          onClick={() => handleProposeAssignment(selectedTask, suggestion)}
        >
          Propose to Assign Task
        </button>
      </div>
    </div>
  );

  return (
    <div className="app">
      <header className="app-header">
        <h1>Task Assignment SuggestAI</h1>
      </header>
      
      <div className="app-content">
        <div className="task-list">
          <h2>Unassigned Tasks</h2>
          {tasks.map(task => (
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
              <div className="task-footer">
                <span className="task-type">{task.type}</span>
                <span className="task-status">{task.status}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="suggestions-panel">
          <h2>Assignment Suggestions</h2>
          {selectedTask ? (
            <div className="suggestions-list">
              {suggestions.map(suggestion => renderSuggestionCard(suggestion))}
            </div>
          ) : (
            <p className="no-selection">Select a task to see suggestions</p>
          )}
        </div>
      </div>

      {/* Processing Popup */}
      {isProcessing && (
        <div className="processing-overlay">
          <div className="processing-popup">
            <div className="processing-content">
              <div className="processing-spinner"></div>
              <h3>Analyzing Task</h3>
              <div className="processing-steps">
                <div className="step-item active">
                  <div className="step-dot active"></div>
                  <span>Analyzing task requirements...</span>
                </div>
                <div className="step-item">
                  <div className="step-dot"></div>
                  <span>Matching team expertise...</span>
                </div>
                <div className="step-item">
                  <div className="step-dot"></div>
                  <span>Calculating confidence scores...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App; 