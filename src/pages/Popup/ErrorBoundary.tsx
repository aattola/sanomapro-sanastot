import React, { ErrorInfo } from 'react';
import * as Sentry from '@sentry/react';
import { Alert, Button } from '@mantine/core';
import ErrorOutlined from '@mui/icons-material/ErrorOutlined';

class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // You can also log the error to an error reporting service
    console.log('ERRORIHA SE ON', error, errorInfo);
    Sentry.captureException(error)
  }

  render() {
    const { state, props } = this
    if ((state as {hasError: boolean}).hasError) {
      // You can render any custom fallback UI
      return (
        <Alert icon={<ErrorOutlined />} title="Virhe" color="red">
          Joku meni todella pahasti rikki. Voit yrittää uudelleen tai luovuttaa.
          {' '}
          <br />
          <Button variant="outline" color="red" style={{ marginTop: 5 }} onClick={() => window.location.reload()}>Yritä uudelleen</Button>
        </Alert>
      );
    }

    return props.children;
  }
}

export default ErrorBoundary
