import { useState } from 'react';

import { Route, Routes, useNavigate } from 'react-router';

import AuthProvider from './contexts/AuthContext.jsx';

import Layout from './layouts/Layout.jsx';

import {
  About,
  Dashboard,
  Home,
  NoMatch,
  ProtectedRoute,
  User,
  Users,
} from './pages/';

const data = [
  { id: '1', fullName: 'John Doe' },
  { id: '2', fullName: 'Nina Williams' },
];

export default function App() {
  const [users, setUsers] = useState(data);
  const navigate = useNavigate();

  const handleRemoveUser = (id) => {
    setUsers(users.filter((u) => u.id !== id));
    navigate('/users');
  };

  return (
    <AuthProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='users' element={<Users users={users} />}>
            <Route
              path=':userId'
              element={<User onRemoveUser={handleRemoveUser} />}
            />
          </Route>
          <Route
            path='dashboard'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path='*' element={<NoMatch />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
