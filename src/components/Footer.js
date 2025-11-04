import React, { Component } from 'react';

class TodoFooter extends Component {
  render() {
    const {
      todos,
      filter,
      onFilterChange,
      onClearCompleted
    } = this.props;

    const activeCount = todos.filter(t => !t.completed).length;
    const hasCompleted = todos.some(t => t.completed);

    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{activeCount}</strong> {activeCount === 1 ? 'item' : 'items'} left
        </span>
        <ul className="filters">
          <li>
            <button
              className={filter === 'all' ? 'selected' : ''}
              onClick={() => onFilterChange('all')}
            >
              All
            </button>
          </li>
          <li>
            <button
              className={filter === 'active' ? 'selected' : ''}
              onClick={() => onFilterChange('active')}
            >
              Active
            </button>
          </li>
          <li>
            <button
              className={filter === 'completed' ? 'selected' : ''}
              onClick={() => onFilterChange('completed')}
            >
              Completed
            </button>
          </li>
        </ul>
        {hasCompleted && (
          <button
            className="clear-completed"
            onClick={onClearCompleted}
          >
            Clear completed
          </button>
        )}
      </footer>
    );
  }
}

export default TodoFooter;