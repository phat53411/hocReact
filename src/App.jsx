import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [todos, setTodos] = useState([
    {
      content: 'Dọn nhà',
      isCompleted: true,
    },
    {
      content: 'Đi ngủ',
      isCompleted: false,
    },
    {
      content: 'Học React',
      isCompleted: false,
    }
  ]);

  function handleKeyDown(e, i) {
    if (e.key === 'Enter') {
      createTodoAtIndex(e, i);
    }
    if (e.key === 'Backspace' && todos[i].content === '') {
      e.preventDefault();
      return removeTodoAtIndex(i);
    }
  }

  function createTodoAtIndex(e, i) {
    const newTodos = [...todos];
    newTodos.splice(i + 1, 0, {
      content: '',
      isCompleted: false,
    });
    setTodos(newTodos);
    setTimeout(() => {
      document.forms[0].elements[i + 1].focus();
    }, 0);
  }

  function updateTodoAtIndex(e, i) {
    const newTodos = [...todos];
    newTodos[i].content = e.target.value;
    setTodos(newTodos);
  }

  function removeTodoAtIndex(i) {
    if (i === 0 && todos.length === 1) return;
    setTodos(todos => todos.slice(0, i).concat(todos.slice(i + 1, todos.length)));
    setTimeout(() => {
      document.forms[0].elements[i - 1].focus();
    }, 0);
  }

  function toggleTodoCompleteAtIndex(index) {
    const temporaryTodos = [...todos];
    temporaryTodos[index].isCompleted = !temporaryTodos[index].isCompleted;
    setTodos(temporaryTodos);
  }

  return (
    <div className="app">
      <div className="header">
        <img src={viteLogo} className="logo" alt="logo" />
        <h1 className='title'>Nguyễn  Tấn Phát - Todo app</h1>
      </div>
      <form className="todo-list">
        <ul>
          {todos.map((todo, i) => (
            <div className={`todo ${todo.isCompleted && 'todo-is-completed'}`}>
              <div className={'checkbox'} onClick={() => toggleTodoCompleteAtIndex(i)}>
                {todo.isCompleted && (
                  <span>&#x2714;</span>
                )}
              </div>
              <input
                type="text"
                value={todo.content}
                onKeyDown={e => handleKeyDown(e, i)}
                onChange={e => updateTodoAtIndex(e, i)}
              />
            </div>
          ))}
        </ul>
      </form>
    </div>
  )
}

export default App
