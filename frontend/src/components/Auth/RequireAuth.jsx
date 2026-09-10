import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './AuthProvider';

/**
 * Pathless layout route gating the /hq section — same shape as
 * CatalogueLayout in App.jsx. Renders the protected routes only once a
 * user is confirmed; otherwise sends the visitor to /hq/login.
 */
export default function RequireAuth() {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/hq/login" replace />;
  return <Outlet />;
}
