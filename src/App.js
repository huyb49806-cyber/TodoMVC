import React, { Component } from 'react';
import {produce} from 'immer';
import './App.css';
import withVirtualScroll from "./HOC/withVirtualScroll";
import TodoHeader from './components/Header';
import TodoFooter from './components/Footer';
import { ThemeContext } from './context/ThemeContext';
// import Pagination from './components/Pagination';
import TodoList from "./components/TodoList"
const VirtualTodoList = withVirtualScroll(TodoList);

const Filter = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed'
};

class App extends Component {
  static contextType = ThemeContext;//đưa giá trị theme và toggleTheme vào this.context

  constructor(props) {
    super(props);
    this.state = {
      todos: [],
      filter: Filter.ALL,
      // currentPage: 1,   
      // itemsPerPage: 8,
      editingId: null,
      headerInputValue: ''
    };
  }

  handleSaveTodo = (text) => {
    const { editingId } = this.state;
    if (editingId) {
      this.handleEditTodo(editingId, text);
      this.setState({ editingId: null, headerInputValue: '' });
    } else {
      this.handleAddTodo(text);
    }
  }

  // Nhận từ TodoItem, đẩy lên state App
  handleItemStartEdit = (id, text) => {
    this.setState({
      editingId: id,
      headerInputValue: text
    });
  }

  // handlePageChange = (pageNumber) => {
  //   this.setState({ currentPage: pageNumber });
  // }

  // Thêm công việc
  handleAddTodo = (text) => {
    this.setState(
      produce((draft)=>{
        draft.todos.unshift({ //dung unshift de them vao dau mang
          id: Date.now(),
          text: text,
          completed: false
        })
      })
    );
  }

  // Chuyển đổi trạng thái complete
  handleToggleTodo = (id) => {
    this.setState(
      produce((draft) => {
        const todo = draft.todos.find((t) => t.id === id);
        if (todo) {
          todo.completed = !todo.completed;
        }
      })
    );
  }

  // Xóa công việc
  handleDeleteTodo = (id) => {
    this.setState(
      produce((draft) => {
        const index = draft.todos.findIndex((t) => t.id === id);
        if (index !== -1) {
          draft.todos.splice(index, 1);
        }
      })
    );
  }

  // Sửa công việc
  handleEditTodo = (id, newText) => {
    if (!newText.trim()) {
      this.handleDeleteTodo(id);
      return;
    }
    this.setState(
      produce((draft) => {
        const todo = draft.todos.find((t) => t.id === id);
        if (todo) {
          todo.text = newText;
        }
      })
    );
  }

  // Đổi bộ lọc
  handleFilterChange = (filter) => {
    this.setState({ filter: filter,currentPage:1 });
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
    const { todos, filter, editingId, headerInputValue } = this.state;
    const { theme, toggleTheme } = this.context;
    const filteredTodos = this.getFilteredTodos();
    // const indexOfLastTodo = currentPage * itemsPerPage; //trang 2: 2*8=16
    // const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
    // const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);
    return (
      <div className={`todoapp ${theme}`}>
        <button
          onClick={toggleTheme}
          style={{ position: 'absolute', top: 10, right: 10, zIndex: 5, cursor: 'pointer' }}
        >
          Theme {theme === 'light' ? 'Light' : 'Dark'} 
        </button>
        <TodoHeader 
          onSave={this.handleSaveTodo}
          inputValue={headerInputValue} 
          editingId={editingId} 
        />
        {todos.length > 0 && (
          <VirtualTodoList
            todos={filteredTodos}
            onToggle={this.handleToggleTodo}
            onDelete={this.handleDeleteTodo}
            onItemStartEdit={this.handleItemStartEdit}
          />
        )}
        {todos.length > 0 && (
          <TodoFooter
            todos={todos}
            filter={filter}
            onFilterChange={this.handleFilterChange}
            onClearCompleted={this.handleClearCompleted}
          />
        )}
        {/* {todos.length > 0 && (
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={filteredTodos.length}
            paginate={this.handlePageChange}
            currentPage={currentPage}
          />
        )} */}
      </div>
    );
  }
}

export default App;