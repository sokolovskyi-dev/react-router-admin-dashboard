import {
  Form,
  isRouteErrorResponse,
  NavLink,
  Outlet,
  redirect,
  useNavigation,
  useRouteError,
} from 'react-router-dom';

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

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 401 || error.status === 403) return <h1>Unauthorized</h1>;
    if (error.status === 404) return <h1>Not Found</h1>;
    return (
      <h1>
        {error.status} {error.statusText}
      </h1>
    );
  }

  if (error instanceof Error) {
    return <pre style={{ padding: 16 }}>{error.message}</pre>;
  }

  return <h1>Unknown! Something went wrong</h1>;
}
