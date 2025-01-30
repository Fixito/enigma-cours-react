import { Outlet } from 'react-router';

import Navbar from '../components/Navbar.jsx';

export default function Layout() {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>
    </>
  );
}
