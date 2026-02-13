import {
  data,
  Form,
  isRouteErrorResponse,
  NavLink,
  Outlet,
  useFetcher,
  useLoaderData,
  useNavigation,
  useRouteError,
  useSearchParams,
  // useSubmit,
} from 'react-router-dom';

import { getUsers, toggleUserActive } from '@/services/users';

export async function loader({ request }) {
  const url = new URL(request.url);

  const { searchParams } = url;
  const status = searchParams.get('status') ?? 'all';
  const q = searchParams.get('q') ?? '';

  const users = await getUsers({ signal: request.signal });
  const query = q.trim().toLowerCase();

  const filteredUsers = users.filter(user => {
    const matchesStatus =
      status === 'all' ||
      (status === 'active' && user.active) ||
      (status === 'inactive' && !user.active);

    const matchesQuery =
      !query || user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query);

    return matchesStatus && matchesQuery;
  });

  return { users: filteredUsers, filters: { status, q } };
}

export async function action({ request }) {
  const formData = await request.formData();
  const intent = formData.get('intent');
  const userId = formData.get('userId');
  if (intent !== 'toggleActive') return null;

  try {
    await toggleUserActive(userId);
    return null;
  } catch (e) {
    console.error(e);
    return data({ error: e?.message ?? 'Failed to toggle user' }, { status: e?.status ?? 500 });
  }
}

export function Component() {
  const { users, filters } = useLoaderData();
  const navigation = useNavigation();
  const [, setSearchParams] = useSearchParams();
  // const submit = useSubmit();

  function handleFilterChange(e) {
    const form = e.currentTarget;
    const formData = new FormData(form);

    const status = String(formData.get('status') ?? 'all');
    const q = String(formData.get('q') ?? '').trim();
    const nextParams = new URLSearchParams();
    if (status && status !== 'all') {
      nextParams.set('status', status);
    }
    if (q) {
      nextParams.set('q', q);
    }
    console.log(nextParams);
    setSearchParams(nextParams, { replace: true });
  }

  return (
    <>
      <div style={{ display: 'flex', gap: 40 }}>
        <aside
          style={{
            borderRight: '1px solid #ddd',
            padding: '12px',
          }}
        >
          <h3>Filter</h3>
          <Form method="get" onChange={handleFilterChange} style={{ margin: '15px 0' }}>
            <select name="status" defaultValue={filters.status}>
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <input name="q" type="search" defaultValue={filters.q} />
          </Form>

          <hr />

          <h3>Users</h3>

          {navigation.state === 'loading' ? <span>...Loading</span> : null}

          <ul>
            {users.map(user => (
              <UserRow key={user.id} user={user} />
            ))}
          </ul>

          <hr />

          <NavLink to="new" end>
            ➕ New user
          </NavLink>
        </aside>

        <section style={{ padding: '16px' }}>
          <Outlet />
        </section>
      </div>
    </>
  );
}

Component.displayName = 'UsersLayout';

function UserRow({ user }) {
  const fetcher = useFetcher();

  // ✅ optimistic только во время submit
  const isSubmitting = fetcher.state === 'submitting';

  let active = user.active;
  if (isSubmitting && fetcher.formData) {
    active = fetcher.formData.get('active') === 'true';
  }

  const error = fetcher.data?.error;

  return (
    <li style={{ borderBottom: '1px solid grey', padding: '6px 0' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <NavLink to={user.id} prefetch="intent" style={{ flex: 1 }}>
          {user.name} {isSubmitting ? '⏳' : null} {active ? '🟢' : '🔴'}
        </NavLink>

        <fetcher.Form method="post">
          <input type="hidden" name="intent" value="toggleActive" />
          <input type="hidden" name="userId" value={user.id} />
          <input type="hidden" name="active" value={String(!user.active)} />

          <button type="submit" disabled={isSubmitting}>
            {active ? 'Disable' : 'Enable'}
          </button>
        </fetcher.Form>
      </div>

      {error ? <p style={{ margin: '6px 0 0', color: 'crimson' }}>{error}</p> : null}
    </li>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 401) return <h1>Unauthorized</h1>;
    if (error.status === 404) return <h1>Not Found</h1>;
    if (error.status === 500) return <h1>Failed to load users</h1>;
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
