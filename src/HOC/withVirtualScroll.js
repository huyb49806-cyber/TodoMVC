// src/HOC/withVirtualScroll.js
import React, { Component } from 'react';

function withVirtualScroll(WrappedComponent) {
  return class VirtualScroll extends Component {
    constructor(props) {
      super(props);
      this.state = {
        startIndex: 0,
        endIndex: 10,
        itemHeight: 60,      // chiều cao 1 item 
        containerHeight: 400 // chiều cao khung scroll
      };

      this.containerRef = React.createRef();
    }

    componentDidMount(){
      this.updateVisibleRange();
      this.containerRef.current.addEventListener("scroll", this.updateVisibleRange);
    }

    componentWillUnmount(){
      this.containerRef.current.removeEventListener("scroll", this.updateVisibleRange);
    }

    updateVisibleRange = () => {
      const { itemHeight, containerHeight } = this.state;
      const scrollTop = this.containerRef.current.scrollTop;

      const startIndex = Math.floor(scrollTop / itemHeight);
      const visibleCount = Math.ceil(containerHeight / itemHeight);

      const endIndex = startIndex + visibleCount + 3;

      this.setState({ startIndex, endIndex });
    };

    render() {
      const { startIndex, endIndex, itemHeight, containerHeight } = this.state;
      const { todos } = this.props;
      const visibleTodos = todos.slice(startIndex, endIndex);
      const totalHeight = todos.length * itemHeight;
      const offsetY = startIndex * itemHeight;
      return (
        <div
          ref={this.containerRef}
          style={{
            height: containerHeight,
            overflowY: "auto",
            position: "relative",
            borderTop: "1px solid #e6e6e6"
          }}
        >
          <div style={{ height: totalHeight, position: "relative" }}>
            <div
              style={{
                position: "absolute",
                top: offsetY,
                left: 0,
                right: 0
              }}
            >
              <WrappedComponent
                {...this.props}
                todos={visibleTodos}
              />
            </div>
          </div>
        </div>
      );
    }
  }
}

export default withVirtualScroll;
