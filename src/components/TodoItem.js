import React, { PureComponent } from 'react';
import withRender from '../HOC/withRender'

class TodoItem extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      editText: this.props.todo.text
    };
    this.editInputRef = React.createRef(); 
  }

  handleDoubleClick = () => {
    this.setState({ isEditing: true, editText: this.props.todo.text });
  }

  handleChange = (e) => {
    this.setState({ editText: e.target.value });
  }

  // Xử lý khi nhấn Enter hoặc blur (mất focus)
  handleSubmit = () => {
    const { todo, onEdit } = this.props;
    const { editText } = this.state;
    
    if (editText.trim() !== todo.text) {
      onEdit(todo.id, editText);
    }
    this.setState({ isEditing: false });
  }

  handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.handleSubmit();
    }
    if (e.key === 'Escape') {
      this.setState({ isEditing: false, editText: this.props.todo.text });
    }
  }

  // Tự động focus khi component update thành isEditing: true`
  componentDidUpdate(prevProps, prevState) {
    if (!prevState.isEditing && this.state.isEditing) {
      this.editInputRef.current.focus();
    }
  }

  render() {
    console.log(`Todo ${this.props.todo.id} rendered`);
    const { todo, onToggle, onDelete } = this.props;
    const { isEditing, editText } = this.state;

    // Class của <li>, thêm editing nếu đang sửa
    let liClassName = '';
    if (todo.completed) liClassName = 'completed';
    if (isEditing) liClassName += ' editing';

    return (
      <li className={liClassName.trim()}>
        {!isEditing ? (
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
        ) : (
          <input
            ref={this.editInputRef}
            className="edit" // CSS cho class "edit" cần được thêm vào
            value={editText}
            onChange={this.handleChange}
            onBlur={this.handleSubmit} // Tự submit khi mất focus
            onKeyDown={this.handleKeyDown}
          />
        )}
      </li>
    );
  }
}

export default withRender(TodoItem);