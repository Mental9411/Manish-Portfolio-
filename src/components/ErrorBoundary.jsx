import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { failed: false };
  }

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error) {
    if (import.meta.env.DEV) console.error('Portfolio render error:', error);
  }

  render() {
    if (this.state.failed) {
      return <main className="error-page page-section" id="main-content"><p className="eyebrow">A SMALL DETOUR</p><h1>That didn’t load as expected.</h1><p>Please refresh the page or head back to the portfolio.</p><a className="button button-light" href="/">Back home <span aria-hidden="true">↗</span></a></main>;
    }
    return this.props.children;
  }
}
