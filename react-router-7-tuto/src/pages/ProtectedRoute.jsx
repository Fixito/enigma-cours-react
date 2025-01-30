import { Navigate } from 'react-router';

import { useAuthContext } from '../contexts/AuthContext.jsx';

export default function ProtectedRoute({ children }) {
  const { token } = useAuthContext();

  if (!token) {
    return <Navigate to='/' replace />;
  }

  return children;
}
