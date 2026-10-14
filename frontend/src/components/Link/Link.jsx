import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { withTrailingSlash } from '@/lib/paths';

const Link = forwardRef(function Link({ to, ...rest }, ref) {
  return <RouterLink ref={ref} to={withTrailingSlash(to)} {...rest} />;
});

export default Link;
