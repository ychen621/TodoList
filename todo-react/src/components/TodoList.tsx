import { Todo } from '../App';
import TodoItem from "./TodoItem";

interface ListProps{
    todos: Todo[];
    toggleComplete: (id: string) => void;
    deleteTodo: (id: string) => void;
}

function TodoList({ todos, toggleComplete, deleteTodo }: ListProps){
    return(
        <ul className='todoList'>
            { todos.map(todo => (
                <TodoItem
                    key={todo.id}
                    todo={todo}
                    toggleComplete={toggleComplete}
                    deleteTodo={deleteTodo}
                />
            ))}
        </ul>
    )
}

export default TodoList;