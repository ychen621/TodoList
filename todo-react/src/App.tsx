//CSS file
import './App.css';

//font
import "./font/Josefin_Sans/JosefinSans-VariableFont_wght.ttf"

//Component
import Api from './Api';
import Header from './components/Header';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import TodoFooter from './components/TodoFooter';
import Footer from './components/Footer';
import Sun from './components/Sun';
import Moon from './components/Moon';

//Other libraries/tools
import useLocalStorage from 'use-local-storage';
import ThemeProvider from 'react-bootstrap/ThemeProvider'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useEffect, useState } from 'react';

//Todo interface
export interface Todo{
  id: string;
  content: string;
  completed: boolean;
}

function App() {
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  
  console.log(filter);
  
  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  const fetchTodos = async() => {
    const res = await Api.get<Todo[]>(`/todos/filter/${filter}`);
    setTodos(res.data);
  }

  const addTodo = async(content: string) => {
    const res = await Api.post<Todo>('/todos', {content});
    setTodos([...todos, res.data]);
  };

  const deleteTodo = async(id: string) => {
    await Api.delete(`/todos/${id}`);
    setTodos(todos.filter(target => target.id !== id));
  }

  const clearCompleted = async() => {
    for(const target of todos){
      if(target.completed){
        await Api.delete(`/todos/${target.id}`);
      }
    }
    setTodos(todos.filter(target => !target.completed));
  }

  const toggleComplete = async(id: string) => {
    const todo = todos.find(target => target.id === id);
    if(todo){
      const res = await Api.put<Todo>(`/todos/${id}`, {completed: !todo.completed});
      setTodos(todos.map(target => (target.id===id ? res.data : target)));
    }
  };

  useEffect(() =>
    {fetchTodos();}, [filter]);

  return (
    <>
      <ThemeProvider
        breakpoints={['xxxl', 'xxl', 'xl', 'lg', 'md', 'sm', 'xs', 'xxs']}
        minBreakpoint="xxs">

        <div className='app' data-theme={theme} 
        style={{width: '100vw',
                height: '40vh',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover'}}>
          <Container>
            <Row className='title'>
              <Col  xxs={10} xs={10} className='title_col' style={{paddingTop: '10%'}}>
                <Header></Header>
              </Col>
              <Col  xxs={2} xs={2}>
                <button onClick={switchTheme} style={{position: 'relative', right: '-20%', top: '50%'}}>
                  {theme==='light' ? <Moon/> : <Sun/>}
                </button>
              </Col>
            </Row>
            <Row className='input'>
              <Col>
                <TodoInput addTodo={addTodo}/>
              </Col>
            </Row>
            <Row className='list'>
              <Col xxs={12}>
                <TodoList todos={todos} toggleComplete={toggleComplete} deleteTodo={deleteTodo}/>
                <TodoFooter num={todos.filter(target => !target.completed).length} setFilter={setFilter} clearCompleted={clearCompleted}/>
              </Col>
            </Row>
            <Row className='footer'>
              <Col><Footer/></Col>
            </Row>
          </Container>
        </div>
      </ThemeProvider>
    </>
  )
}

export default App
