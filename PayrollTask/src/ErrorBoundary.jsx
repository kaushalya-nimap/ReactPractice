import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

 
  componentDidCatch(error) {
    this.setState({ hasError: true, errorMessage: this.props.errorMessage });
    console.error(error);
  }
  
  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong. Please try again later.</h2>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
