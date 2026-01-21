import { NavLink, Outlet, redirect } from 'react-router-dom';

import { getSession } from '@/services/auth';

export async function loader() {
  const session = await getSession();
  if (!session) throw redirect('/login');
  return session;
}

export function Component() {
  return (
    <>
      <header style={{ padding: 20 }}>
        <nav style={{ display: 'flex', gap: 12 }}>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/users">Users</NavLink>
          <NavLink to="/login">Login</NavLink>
        </nav>
      </header>

      <hr />
      <main>
        <Outlet />
      </main>
    </>
  );
}

Component.displayName = 'ProtectedLayout';
