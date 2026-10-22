import { useEffect, useState } from 'react';
import { fetchPageOverrides } from './pageOverrides';

// The admin-edited text for one landing page, or null while loading / when
// the page has none. Callers render their built-in copy until this resolves.
export function usePageOverride(section, slug) {
  const [override, setOverride] = useState(null);

  useEffect(() => {
    let alive = true;
    fetchPageOverrides().then((map) => {
      if (alive) setOverride(map[`${section}/${slug}`] || null);
    });
    return () => {
      alive = false;
    };
  }, [section, slug]);

  return override;
}
