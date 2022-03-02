import React from 'react'
import * as Sentry from '@sentry/react';
import { Alert, Button } from '@mantine/core';
import ErrorOutlined from '@mui/icons-material/ErrorOutlined';

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
    console.log('ERRORIHA SE ON', error, errorInfo);
    Sentry.captureException(error)
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Alert icon={<ErrorOutlined size={16} />} title="Virhe" color="red">
          Joku meni todella pahasti rikki. Voit yrittää uudelleen tai luovuttaa.
          {' '}
          <br />
          <Button variant="outline" color="red" style={{ marginTop: 5 }} onClick={() => window.location.reload()}>Yritä uudelleen</Button>
        </Alert>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary
