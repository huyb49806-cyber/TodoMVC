import React, { Component } from 'react';

class TodoHeader extends Component {
  render() {
    const { inputText, onInputChange, onAddTodo } = this.props;

    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={onAddTodo}>
          <input
            className="new-todo"
            placeholder="Nhập công việc cần làm"
            value={inputText}
            onChange={onInputChange}
            autoFocus
          />
        </form>
      </header>
    );
  }
}

export default TodoHeader;