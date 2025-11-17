import React, { Component } from 'react';

class TodoHeader extends Component {
  constructor(props){
    super(props);
    this.state={
      text:''
    };
    this.inputRef = React.createRef();
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
    this.props.onAddTodo(text);
    this.setState({text:''});
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.handleSubmit}>
          <input
            ref={this.inputRef}
            className="new-todo"
            placeholder="Nhập công việc cần làm"
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