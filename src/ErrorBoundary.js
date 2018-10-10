import React, {Component} from 'react';
import DataFailed from './DataFailed';

class ErrorBoundary extends Component {
  state = {
    hasError: false
  }

  componentDidCatch(error, info) {
    this.setState({ hasError: true });
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <DataFailed />;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;