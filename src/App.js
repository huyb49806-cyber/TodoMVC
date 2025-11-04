import React, { Component } from 'react';
import './App.css';
import TodoList from './components/TodoList';
import TodoHeader from './components/Header';
import TodoFooter from './components/Footer';
import { ThemeContext } from './context/ThemeContext';

class App extends Component {
  static contextType = ThemeContext;

  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      inputText: '',
      filter: 'all',
      currentPage: 1,
      itemsPerPage: 8
    };
  }

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  }


  //cập nhập state khi nhập input
  handleInputChange = (e) => {
    this.setState({ inputText: e.target.value });
  }

  // Thêm công việc
  handleAddTodo = (e) => {
    e.preventDefault();
    const { inputText, todos } = this.state;
    if (!inputText.trim()) return;
    const newTodo = {
      id: Date.now(),
      text: inputText.trim(),
      completed: false
    };
    this.setState({
      todos: [...todos, newTodo],
      inputText: ''
    });
  }

  // Chuyển đổi trạng thái complete
  handleToggleTodo = (id) => {
    this.setState(({ todos }) => ({
      todos: todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    }));
  }

  // Xóa công việc
  handleDeleteTodo = (id) => {
    this.setState(({ todos }) => ({
      todos: todos.filter(todo => todo.id !== id)
    }));
  }

  // Sửa công việc
  handleEditTodo = (id, newText) => {
    if (!newText.trim()) {
      this.handleDeleteTodo(id); // Nếu sửa thành rỗng thì xóa
      return;
    }
    this.setState(({ todos }) => ({
      todos: todos.map(todo =>
        todo.id === id ? { ...todo, text: newText.trim() } : todo
      )
    }));
  }

  // Đổi bộ lọc
  handleFilterChange = (filter) => {
    this.setState({ filter: filter });
  }

  // Xóa các mục đã hoàn thành
  handleClearCompleted = () => {
    this.setState(({ todos }) => ({
      todos: todos.filter(todo => !todo.completed)
    }));
  }

  // Lấy danh sách công việc theo bộ lọc
  getFilteredTodos() {
    const { todos, filter } = this.state;
    if (filter === 'active') return todos.filter(t => !t.completed);
    if (filter === 'completed') return todos.filter(t => t.completed);
    return todos;
  }

  render() {
    const { todos, inputText, filter } = this.state;
    const { theme, toggleTheme } = this.context;
    const filteredTodos = this.getFilteredTodos();

    return (
      <div className={`todoapp ${theme}`}>
        <button
          onClick={toggleTheme}
          style={{ position: 'absolute', top: 10, right: 10, zIndex: 100, cursor: 'pointer' }}
        >
          Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
        <TodoHeader
          inputText={inputText}
          onInputChange={this.handleInputChange}
          onAddTodo={this.handleAddTodo}
        />
        {todos.length > 0 && (
          <TodoList
            todos={filteredTodos} // Truyền danh sách đã lọc
            onToggle={this.handleToggleTodo}
            onDelete={this.handleDeleteTodo}
            onEdit={this.handleEditTodo}
          />
        )}
        {todos.length > 0 && (
          <TodoFooter
            todos={todos} // Footer cần danh sách đầy đủ để đếm
            filter={filter}
            onFilterChange={this.handleFilterChange}
            onClearCompleted={this.handleClearCompleted}
          />
        )}
      </div>
    );
  }
}

export default App;