import { Component } from 'react';
import { resetCatalogCache } from '@/lib/catalog';
import styles from './CatalogueErrorBoundary.module.css';

/**
 * Catches a failed data fetch (thrown by `use()` in data/products.js or
 * lib/publicMarkets.js) so a visitor sees a real retry message instead of
 * a blank page or the default React error overlay. React error boundaries
 * must be class components — there's no hook equivalent.
 *
 * `title`/`body` default to the original catalogue wording; pass your own
 * for a different consumer (e.g. the market pages) so the message matches
 * what actually failed to load. `onRetry` defaults to clearing the
 * catalogue's cache — pass your own (e.g. resetMarketCache(slug)) for a
 * different data source.
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
    (this.props.onRetry || resetCatalogCache)();
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      const {
        title = "Couldn't load the catalogue",
        body = 'Something went wrong reaching our product data. Please try again, or contact our export team directly if this keeps happening.',
      } = this.props;
      return (
        <div className={styles.wrap}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.body}>{body}</p>
          <button type="button" className={styles.retry} onClick={this.handleRetry}>
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
