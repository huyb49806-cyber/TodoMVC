import React, { Component } from 'react';

class TodoHeader extends Component {
  constructor(props){
    super(props);
    this.state={
      text:''
    };
    this.inputRef = React.createRef();
  }
  componentDidUpdate(prevProps) {
    // Nếu editingId thay đổi (tức là người dùng double click vào 1 item khác) hoặc input value thay đổi
    if (prevProps.editingId !== this.props.editingId || prevProps.inputValue !== this.props.inputValue) {
      this.setState({ text: this.props.inputValue || '' });
      this.focusInput();
    }
  }
  focusInput = () => {
    if (this.inputRef.current) {
      this.inputRef.current.focus();
    }
  }

  handleChange=(e)=>{
    this.setState({text:e.target.value});
  }

  handleSubmit=(e)=>{
    e.preventDefault();
    const text = this.state.text.trim();
    if(!text) return;
    this.props.onSave(text);
    this.setState({text:''});
  }

  render() {
    const { editingId } = this.props;
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            ref={this.inputRef}
            className="new-todo"
            placeholder={editingId ? "Đang sửa công việc..." : "Nhập công việc cần làm"}
            value={this.state.text}
            onChange={this.handleChange}
            autoFocus
          />
        </form>
      </header>
    );
  }
}

export default TodoHeader;