import React from "react";
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';

interface FooterProps{
    num: number;
    setFilter: React.Dispatch<React.SetStateAction<'all' | 'active' | 'completed'>>;
    clearCompleted: () => void;
}

function TofoFooter({num, setFilter, clearCompleted}: FooterProps){
    return (
        <>
        <div className="todo-footer">
            <span>{num} items left</span>
            <div className="filter-btn-gp">
                <ButtonGroup size='sm' aria-label="filter-btn">
                    <Button onClick={() => setFilter('all')} className='filter-btn'>ALL</Button>
                    <Button onClick={() => setFilter('active')} className='filter-btn'>Active</Button>
                    <Button onClick={() => setFilter('completed')} className='filter-btn'>Completed</Button>
                </ButtonGroup>
            </div>
            <Button size="sm" onClick={clearCompleted} className='filter-btn'>Clear Completed</Button>
        </div>
        </>
    )
}

export default TofoFooter;