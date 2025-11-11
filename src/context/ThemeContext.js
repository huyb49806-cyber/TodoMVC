import React, { createContext, Component } from 'react';

// Tạo context
export const ThemeContext = createContext();

export class ThemeProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: 'light',
    };
  }
  toggleTheme = () => {
    this.setState(prevState => ({
      theme: prevState.theme === 'light' ? 'dark' : 'light'
    }));
  };

  render() {
    const { theme } = this.state;
    const { children } = this.props;

    return (
      <ThemeContext.Provider
        value={{
          theme,
          toggleTheme: this.toggleTheme
        }}
      >
        {children}
      </ThemeContext.Provider>
    );
  }
}
