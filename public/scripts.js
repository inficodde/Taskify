

// scripts.js
document.addEventListener('DOMContentLoaded', () => {
    const addTaskForm = document.querySelector('#addTaskForm');
    const deleteTaskForm = document.querySelector('#deleteTaskForm');
  
    addTaskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const task = addTaskForm.querySelector('input[name="task"]').value;
  
      fetch('/addTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ task }),
      }).then(() => {
        window.location.reload();
      });
    });
  
    deleteTaskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const taskToDelete = deleteTaskForm.querySelector('input[name="taskToDelete"]').value;
  
      fetch('/deleteTask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ taskToDelete }),
      }).then(() => {
        window.location.reload();
      });
    });
  });
  