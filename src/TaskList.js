import React, { useState, useEffect } from 'react';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/list?user_id=${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const tasksData = await response.json();
          setTasks(tasksData);
        } else {
          const errorData = await response.text();
          setError(errorData);
        }
      } catch (error) {
        console.error('Error:', error);
        setError('Failed to fetch tasks.');
      }
    };

    fetchTasks();
  }, [userId]);

  return (
    <div>
      <h2>Task List</h2>
      {error && <div>{error}</div>}
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
