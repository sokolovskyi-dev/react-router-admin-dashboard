import {
  data,
  isRouteErrorResponse,
  Link,
  useLoaderData,
  useNavigation,
  // useParams,
  useRouteError,
} from 'react-router-dom';

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
  const navigation = useNavigation();
  const nextPath = navigation.location?.pathname;

  const currentPath = `/users/${user.id}`;
  const isLoadingOtherUser =
    navigation.state === 'loading' && nextPath?.startsWith('/users/') && nextPath !== currentPath;

  return (
    <>
      <h2>Details user {user.id}</h2>
      {isLoadingOtherUser ? <p>Loading user…</p> : null}

      <Link to={`/users/${user.id}/edit`} prefetch="intent">
        Edit
      </Link>
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
