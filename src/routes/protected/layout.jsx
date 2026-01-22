import { Form, NavLink, Outlet, redirect, useNavigation } from 'react-router-dom';

import { getSession, logout } from '@/services/auth';

export async function loader() {
  const session = await getSession();
  if (!session) throw redirect('/login');
  return session;
}

export async function action() {
  await logout();
  return redirect('/login');
}

export function Component() {
  const navigation = useNavigation();
  return (
    <>
      <header style={{ padding: 20, display: 'flex', alignItems: 'center' }}>
        <nav style={{ display: 'flex', gap: 12 }}>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/users">Users</NavLink>
          {/* <NavLink to="/login">Login</NavLink> */}
        </nav>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 12, alignItems: 'center' }}>
          {navigation.state !== 'idle' ? <span>...Loading</span> : null}
          <Form method="post">
            <button type="submit">Logout</button>
          </Form>
        </div>
      </header>

      <hr />
      <main>
        <Outlet />
      </main>
    </>
  );
}

Component.displayName = 'ProtectedLayout';
