import { Todo } from '../App';
import Check from './Check';
import Cross from './Cross';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';

interface ItemProps{
    todo: Todo;
    toggleComplete: (id: string) => void;
    deleteTodo: (id: string) => void;
}

function TodoItem({ todo, toggleComplete, deleteTodo }: ItemProps){
    return(
        <li className= {`todo-item ${todo.completed ? 'completed' : ''}`}>
            <Container className='px-0 item_container'>
                <Row className='item_row'>
                    <Col xxs={'auto'} className='item_col_btn'>
                        <Button className='item_check px-4' onClick={() => toggleComplete(todo.id)}><Check fill={todo.completed ? 'url(#grad1)':'none'} stroke={todo.completed? 'white':''}/></Button>
                    </Col>
                    <Col xxs={8} className='item_col_content'style={{flex: 1}}>
                        <h4 className={`mb-0 ${todo.completed? 'strikethrough': ''}`}>{todo.content}</h4>
                    </Col>
                    <Col  xxs={'auto'} className='item_col_btn'>
                        <Button className='item_cross px-4' onClick={() => deleteTodo(todo.id)}><Cross stroke='#cacde8'/></Button>
                    </Col>
                </Row>
            </Container>
        </li>
    )
}

export default TodoItem;

/**
 * <li className= {`todo-item ${todo.completed ? 'completed' : ''}`}>
        <input
            type='checkbox'
            checked={todo.completed}
            onChange={() => toggleComplete(todo.id)}/>
        <label>{todo.content}</label>
        <Button onClick={() => deleteTodo(todo.id)}><Cross/></Button>
    </li>
 */