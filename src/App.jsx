import { useEffect, useState } from 'react';
import './App.css';
import ToDoText from './ToDoText';

function App() {
  const [tasks, setTasks] = useState([]);
  const [inputText, setInputText] = useState('');
  const [notes, setNotes] = useState('');
  const [isRewriting, setIsRewriting] = useState(false);
  
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
    const storedNotes = localStorage.getItem("notesForLS") || '';
    setNotes(storedNotes);
  }, []);


  
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const newTask = {
      id: Date.now(),
      text: inputText,
      done: false,
    };
    setTasks([...tasks, newTask]);
    setInputText('');
    saveInLS([...tasks, newTask])
  };

  const handleTaskDelete = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    saveInLS(tasks.filter((task) => task.id !== taskId))
  };

  const handleTaskDone = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, done: !task.done } : task
      )
    );
    saveInLS(tasks.map((task) =>
    task.id === taskId ? { ...task, done: !task.done } : task
  ))
  };

  const handleTaskRewrite = (taskId, newText) => {
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, text: newText } : task
    );
    setTasks(updatedTasks);
    saveInLS(updatedTasks)
  };

function saveInLS(AllTasks){
  localStorage.setItem('tasks',JSON.stringify(AllTasks))
  }
  

  return (
    <div className="main-container">
      <h1>My ToDo List</h1>
      <form className="text-add-area" onSubmit={handleFormSubmit}>
        <input
          id="input-text"
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="text here"
        />
        <button id="button-submit" type="submit">
          Add
        </button>
      </form>

      <div className="todo-list-area">
        {
          tasks.length=== 0  && <div id="empty-area">
            <span className='nothingToDo'>&#9785;</span>
            <p>Nothing To Do today???</p>
          </div>

        }
        {tasks.map((task) => (
                  <div key={task.id} className="todoList-item">
                    <ToDoText task={task} handleTaskDone={handleTaskDone} isRewriting={isRewriting} setIsRewriting={setIsRewriting} handleTaskRewrite={handleTaskRewrite}/>
                  
                  <div>
                    
                      <button type="button" id="done" data-action="done"
                      onClick={() => handleTaskDone(task.id)}
                      >
                                <span aria-hidden="true" >&#10004;</span>
                      </button>
                      <button type="button"  data-action="close"
                        onClick={() => handleTaskDelete(task.id)}
                      >
                        <span aria-hidden="true">&#10008;</span>
                      </button>
                    </div>
                  </div>
                ))}
          
      </div>

      <div className="notes-area">
        <p>Notes</p>
        <textarea
          placeholder="some notes here"
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value)
            localStorage.setItem("notesForLS",e.target.value);
          }
          }
          style={{ backgroundColor: 'transparent' }}
          cols="25"
          rows="5"
        ></textarea>
      </div>
    </div>
  );
}

export default App;
