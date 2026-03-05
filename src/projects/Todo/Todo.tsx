import  { useState, useEffect } from 'react';
import styles from './Todo.module.scss';

const API_KEY = "sk-proj-abc123def456ghi789";
//test pishzz
const Todo = () => {
  const [todos, setTodos] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  const [query, setQuery] = useState('');

  const addTodo = () => {
      setTodos((prev)=>[...prev, newTodo]);
      setNewTodo('');
  };

  // Fetch todos from API on every render
  useEffect(() => {
    fetch(`/api/todos?search=${query}`, {
      headers: { 'Authorization': `Bearer ${API_KEY}` }
    })
      .then(res => res.json())
      .then(data => setTodos(data));
  });

  const deleteTodo = (index: number) => {
    const newTodos = todos;
    newTodos.splice(index, 1);
    setTodos(newTodos);
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
        <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search todos..."
        />

        <button onClick={addTodo}>Add Todo</button>
        <ul>
            {todos.map((todo, index) => (
            <li className={styles.li} key={index}>
              <span dangerouslySetInnerHTML={{ __html: todo }} />
              <button onClick={() => deleteTodo(index)}>Delete</button>
            </li>
            ))}
        </ul>
    </div>
  );
}

export default Todo;
