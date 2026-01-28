import {
  data,
  Form,
  isRouteErrorResponse,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
  useRouteError,
} from 'react-router-dom';

import { getUser, updateUser, validateUser } from '@/services/users';

export async function loader({ params }) {
  const { userId } = params;

  try {
    const user = await getUser(userId);
    return { user };
  } catch (error) {
    if (error?.status === 404) throw data({ message: 'User not found' }, { status: 404 });
    throw error;
  }
}

export async function action({ request, params }) {
  const formData = await request.formData();

  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();

  const fieldErrors = validateUser({ name, email });
  const hasErrors = Object.values(fieldErrors).some(Boolean);

  if (hasErrors) {
    return data({ fieldErrors }, { status: 400 });
  }

  await updateUser(params.userId, { name, email });
  return redirect(`/users/${params.userId}`);
}

export function Component() {
  const navigation = useNavigation();
  const { user } = useLoaderData();
  const actionData = useActionData();
  return (
    <>
      <h2>Edit</h2>
      <Form method="post">
        <div>
          <label>
            <p style={{ marginBottom: 0, color: 'gray' }}>Name</p>
            <input name="name" type="text" defaultValue={user.name} />
            {actionData?.fieldErrors?.name && (
              <p style={{ color: 'red' }}>{actionData?.fieldErrors?.name}</p>
            )}
          </label>
        </div>

        <div>
          <label>
            <p style={{ marginBottom: 0, color: 'gray' }}>Email</p>
            <input name="email" type="email" defaultValue={user.email} />
            {actionData?.fieldErrors?.email && (
              <p style={{ color: 'red' }}>{actionData?.fieldErrors?.email}</p>
            )}
          </label>
        </div>

        <button type="submit" disabled={navigation.state !== 'idle'}>
          Save
        </button>
      </Form>
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) return <h1>Not Found</h1>;
    return (
      <h1>
        {error.status} {error.statusText}
      </h1>
    );
  }
  return <h1>Something went wrong:</h1>;
}
