import React, { Component } from 'react';
import withRender from '../HOC/withRender'

class TodoItem extends Component {
  handleDoubleClick = () => {
    const { todo, onItemStartEdit } = this.props;
    if (onItemStartEdit) {
      onItemStartEdit(todo.id, todo.text);
    }
  }

  render() {
    console.log(`Todo ${this.props.todo.id} rendered`);
    const { todo, onToggle, onDelete } = this.props;
    const liClassName = todo.completed ? 'completed' : '';

    return (
      <li className={liClassName.trim()}>
          <div className="view">
            <input
              className="toggle"
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
            />
            <label onDoubleClick={this.handleDoubleClick}>{todo.text}</label>
            <button
              className="destroy"
              onClick={() => onDelete(todo.id)}
            ></button>
          </div>
      </li>
    );
  }
}

export default withRender(TodoItem);