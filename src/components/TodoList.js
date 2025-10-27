import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoList extends Component {
  render() {
    const { todos, onToggle, onDelete } = this.props;
    return (
      <ul className="todo-list">
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
          />
        ))}
      </ul>
    );
  }
}

export default TodoList;
