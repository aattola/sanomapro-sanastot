import React from 'react'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log("ERRORIHA SE ON", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div style={{background: "#ff8484", color: "#292929", borderRadius: 4, padding: 10}}>
          <h1>Joku meni rikki koita uudelleen</h1>
          <button onClick={() => window.location.reload()}>koitetaan uusiksi</button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary
