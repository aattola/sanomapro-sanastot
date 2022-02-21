import React from 'react'
import {
  Alert,
  AlertTitle, Button,
} from '@mui/material';
import * as Sentry from '@sentry/react';

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
        <>
          <Alert
            severity="error"
          >
            <AlertTitle>Virhe</AlertTitle>
            Jokin meni rikki kunnolla —
            {' '}
            <strong>yritä uudelleen tai älä.</strong>
          </Alert>
          <center>
            <Button variant="outlined" style={{ marginTop: 5 }} onClick={() => window.location.reload()}>Yritä uudelleen</Button>
          </center>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary
