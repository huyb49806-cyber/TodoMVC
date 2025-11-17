import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoList extends Component {
  render() {
    const { todos, onToggle, onDelete, onEdit } = this.props;

    return (
      // <section className="main">
        <ul className="todo-list">
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit} 
            />
          ))}
        </ul>
      // </section>
    );
  }
}

export default TodoList;