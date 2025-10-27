import React, { Component } from 'react';
import './App.css';
import TodoList from './components/TodoList';
class App extends Component {
  constructor(props){
    super(props);
    this.state={
      todos:[],
      inputText:'',
      filter:'all'
    };
  }

  handleInputChange = (e) => {
    this.setState({ inputText: e.target.value });
    console.log(e.target.value);
  }

  handleAddTodo = (e) => {
    e.preventDefault();
    const { inputText, todos } = this.state;
    if (!inputText.trim()) return;
    const newTodo={
      id: Date.now(),
      text: inputText.trim(),
      completed: false
    };
    this.setState({
      todos: [...todos, newTodo],
      inputText: ''
    });
  }

  handleToggleTodo = (id) => {
    this.setState(({ todos }) => ({
      todos: todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    }));
  }

  handleDeleteTodo = (id) => {
    this.setState(({ todos }) => ({
      todos: todos.filter(todo => todo.id !== id)
    }));
  }

  handleToggleAll = () => {
    this.setState(({ todos }) => {
      const allCompleted = todos.every(t => t.completed);
      return { todos: todos.map(t => ({ ...t, completed: !allCompleted })) };
    });
  }

  handleFilterChange = (filter) => {
    this.setState({ filter });
  }

  handleClearCompleted = () => {
    this.setState(({ todos }) => ({
      todos: todos.filter(todo => !todo.completed)
    }));
  }

  getFilteredTodos() {
    const { todos, filter } = this.state;
    if (filter === 'active') return todos.filter(t => !t.completed);
    if (filter === 'completed') return todos.filter(t => t.completed);
    return todos;

  }
  render(){
    const { todos, inputText, filter } = this.state;
    const remaining=todos.filter(t => !t.completed).length;
    const filteredTodos = this.getFilteredTodos();

    return (
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form onSubmit={this.handleAddTodo}>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              value={inputText}
              onChange={this.handleInputChange}
              autoFocus
            />
          </form>
        </header>

        {todos.length > 0 && (
          <section className="main">
            <input
              id="toggle-all"
              className="toggle-all"
              type="checkbox"
              onChange={this.handleToggleAll}
              checked={todos.every(t => t.completed)}
            />
            <label htmlFor="toggle-all"></label>

            <TodoList
              todos={filteredTodos}
              onToggle={this.handleToggleTodo}
              onDelete={this.handleDeleteTodo}
            />
          </section>
        )}

        {todos.length > 0 && (
          <footer className="footer">
            <span className="todo-count">
              <strong>{remaining}</strong> {remaining === 1 ? 'item' : 'items'} left
            </span>

            <ul className="filters">
              <li>
                <button
                  className={filter === 'all' ? 'selected' : ''}
                  onClick={() => this.handleFilterChange('all')}
                >
                  All
                </button>
              </li>
              <li>
                <button
                  className={filter === 'active' ? 'selected' : ''}
                  onClick={() => this.handleFilterChange('active')}
                >
                  Active
                </button>
              </li>
              <li>
                <button
                  className={filter === 'completed' ? 'selected' : ''}
                  onClick={() => this.handleFilterChange('completed')}
                >
                  Completed
                </button>
              </li>
            </ul>

            {todos.some(t => t.completed) && (
              <button
                className="clear-completed"
                onClick={this.handleClearCompleted}
              >
                Clear completed
              </button>
            )}
          </footer>
        )}
      </div>
    );
  }
}

export default App;