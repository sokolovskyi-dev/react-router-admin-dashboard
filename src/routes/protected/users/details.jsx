import { data, isRouteErrorResponse, Link, useLoaderData, useRouteError } from 'react-router-dom';

import { getUser } from '@/services/users';

export async function loader({ params }) {
  const { userId } = params;
  try {
    const user = await getUser(userId);

    return { user };
  } catch (error) {
    if (error?.status === 404) {
      throw data({ message: 'User not found' }, { status: 404 });
    }
    throw error;
  }
}

export function Component() {
  // const { userId } = useParams();
  const { user } = useLoaderData();
  // const { name, email, active } = user;

  return (
    <>
      <h2>Details user {user.id}</h2>
      <Link to={`/users/${user.id}/edit`}>Edit</Link>
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) return <p>{error.data?.message ?? 'Not found'}</p>;
    return <p>Request failed: {error.status}</p>;
  }
  return <p>Something went wrong</p>;
}
