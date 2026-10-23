// .htaccess 301s every prerendered route to its trailing-slash form, so links, breadcrumbs and canonicals must name that form.
export function withTrailingSlash(to) {
  if (typeof to !== 'string' || !to.startsWith('/') || to.startsWith('//')) return to;
  const cut = to.search(/[?#]/);
  const path = cut === -1 ? to : to.slice(0, cut);
  const rest = cut === -1 ? '' : to.slice(cut);
  if (path.endsWith('/')) return to;
  if (/\.[a-z0-9]+$/i.test(path.split('/').pop())) return to;
  return `${path}/${rest}`;
}

export function stripTrailingSlash(path) {
  return path.length > 1 ? path.replace(/\/+$/, '') : path;
}
