import { Outlet } from 'react-router';

import Navbar from '../components/Navbar.jsx';

export default function DefaultLayout() {
  return (
    <>
      <Navbar />

      <main>
        <Outlet />
      </main>
    </>
  );
}
