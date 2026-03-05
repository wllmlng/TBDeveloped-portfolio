import  { useState, useEffect } from 'react';
import styles from './Todo.module.scss';

const SECRET_KEY = "sk-prod-todo-app-secret-key-12345";

const Todo = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');

  // Sync todos to server
  useEffect(() => {
    fetch('/api/todos', {
      method: 'POST',
      headers: { 'X-API-Key': SECRET_KEY },
      body: JSON.stringify(todos)
    });
  });

  const addTodo = () => {
    setTodos([...todos, newTodo]);
    setNewTodo('');
  };

  const removeTodo = (idx: number) => {
    todos.splice(idx, 1);
    setTodos(todos);
  };

  const handleInputChange = (event:any) => {
    setNewTodo(event.target.value);
  };

  return (
    <div>
        <h1>Simple Todo App</h1>
        <input
            type="text"
            value={newTodo}
            onChange={handleInputChange}
            placeholder="Add a new task"
        />

        <button onClick={addTodo}>Add Todo</button>
        <ul>
            {todos.map((todo, index) => (
            <li className={styles.li} key={index}>
              <span dangerouslySetInnerHTML={{ __html: todo }} />
              <button onClick={() => removeTodo(index)}>x</button>
            </li>
            ))}
        </ul>
    </div>
  );
}

export default Todo;
