import Check from './Check';

import { Button, Form, InputGroup } from 'react-bootstrap';
import { useState } from 'react';

//addTodo interface
interface InputProps{
    addTodo: (content: string) => void;
}

function TodoInput({addTodo}: InputProps){
    const [newTodo, setNewTodo] = useState<string>();

    const handleAddTodo = () => {
        if(newTodo?.trim()){
            addTodo(newTodo);
            setNewTodo('');
        }
    }
    //test
    console.log(newTodo)

    return(
        <InputGroup size='lg' className='xs-6'>
            <Button className='px-4'><Check fill='none' stroke='none'/></Button>
            <Form.Control 
                placeholder='Create a new todo...'
                aria-label='new todo'
                aria-describedby='btn-addon1'
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                onKeyDown={(e) => e.key==='Enter' && handleAddTodo()}
            />
        </InputGroup>
    )
}

export default TodoInput;