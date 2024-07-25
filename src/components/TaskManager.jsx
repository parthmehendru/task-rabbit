import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  useEffect(() => {
    // Fetch tasks
    axios.get('/api/tasks')
      .then(response => {
        setTasks(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the tasks!', error);
      });
  }, []);

  const handleChange = (e) => {
    setTask(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/tasks', { task })
      .then(response => {
        setTasks([...tasks, response.data]);
        setTask('');
      })
      .catch(error => {
        console.error('There was an error creating the task!', error);
      });
  };

  const handleDelete = (id) => {
    axios.delete(`/api/tasks/${id}`)
      .then(response => {
        setTasks(tasks.filter(task => task._id !== id));
      })
      .catch(error => {
        console.error('There was an error deleting the task!', error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={task} onChange={handleChange} placeholder="New task" />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            {task.name}
            <button onClick={() => handleDelete(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;