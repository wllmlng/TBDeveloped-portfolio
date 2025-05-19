import  { useState } from 'react';
import styles from './Todo.module.scss';

const Todo = () => {
  const [todos, setTodos] = useState<string[]>([]); 
  const [newTodo, setNewTodo] = useState<string>(''); 

  const addTodo = () => {
    if (newTodo.trim()) {  
      setTodos((prev)=>[...prev, newTodo]); 
      setNewTodo(''); 
    }
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
            <li className={styles.li} key={index}>{todo}</li>
            ))}
        </ul>
    </div>
  );
}

export default Todo;
