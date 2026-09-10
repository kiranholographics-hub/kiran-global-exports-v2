import { Component } from 'react';
import { resetCatalogCache } from '@/lib/catalog';
import styles from './CatalogueErrorBoundary.module.css';

/**
 * Catches a failed catalogue fetch (thrown by `use()` in data/products.js)
 * so a buyer sees a real retry message instead of a blank page or the
 * default React error overlay. React error boundaries must be class
 * components — there's no hook equivalent.
 */
export default class CatalogueErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error) {
    console.error('[CatalogueErrorBoundary]', error);
  }

  handleRetry = () => {
    resetCatalogCache();
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.wrap}>
          <h2 className={styles.title}>Couldn&rsquo;t load the catalogue</h2>
          <p className={styles.body}>
            Something went wrong reaching our product data. Please try again, or contact our
            export team directly if this keeps happening.
          </p>
          <button type="button" className={styles.retry} onClick={this.handleRetry}>
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
