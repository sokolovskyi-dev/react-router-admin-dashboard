import {
  data,
  Form,
  isRouteErrorResponse,
  redirect,
  useActionData,
  useNavigation,
  useRouteError,
} from 'react-router-dom';

import { createUser, validateUser } from '@/services/users';

export async function action({ request }) {
  const formData = await request.formData();

  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();

  const fieldErrors = validateUser({ name, email });
  const hasErrors = Object.values(fieldErrors).some(Boolean);

  if (hasErrors) {
    return data({ fieldErrors }, { status: 400 });
  }

  try {
    const user = await createUser({ name, email });
    return redirect(`/users/${user.id}`);
  } catch (e) {
    console.error(e);
    throw data({ message: 'Failed to create user' }, { status: 500 });
  }
}

export function Component() {
  const navigation = useNavigation();
  const actionData = useActionData();

  return (
    <>
      <h1>New</h1>
      <Form method="post">
        <div>
          <label>
            <p style={{ marginBottom: 0, color: 'gray' }}>Name</p>
            <input name="name" type="text" />
            {actionData?.fieldErrors?.name && (
              <p style={{ color: 'red' }}>{actionData?.fieldErrors?.name}</p>
            )}
          </label>
        </div>
        <div>
          <label>
            <p style={{ marginBottom: 0, color: 'gray' }}>Email</p>
            <input name="email" type="email" />
            {actionData?.fieldErrors?.email && (
              <p style={{ color: 'red' }}>{actionData?.fieldErrors?.email}</p>
            )}
          </label>
        </div>
        <button type="submit" disabled={navigation.state !== 'idle'}>
          Create new user
        </button>
      </Form>
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) return <h1>Not Found</h1>;
    if (error.status === 401) return <h1>Unauthorized</h1>;
    return (
      <h1>
        {error.status} {error.statusText}
      </h1>
    );
  }

  if (error instanceof Error) {
    return <pre>{error.message}</pre>;
  }
  return <pre>Unknown error</pre>;
}
