import React, { Component } from 'react';

class TodoItem extends Component {
  render() {
    const { todo, onToggle, onDelete } = this.props;

    return (
      <li className={todo.completed ? 'completed' : ''}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggle(todo.id)}
          />
          <label>{todo.text}</label>

          {/* 👇 Nút “x” để xoá từng todo */}
          <button
            className="destroy"
            onClick={() => onDelete(todo.id)}
            aria-label="Delete todo"
          ></button>
        </div>
      </li>
    );
  }
}

export default TodoItem;
