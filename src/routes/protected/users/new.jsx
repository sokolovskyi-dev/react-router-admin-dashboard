import {
  data,
  Form,
  isRouteErrorResponse,
  redirect,
  useActionData,
  useNavigation,
  useRouteError,
} from 'react-router-dom';

import { createUser } from '@/services/users';

export async function action({ request }) {
  const formData = await request.formData();

  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();

  function validateUser({ name, email }) {
    return {
      name: name ? null : 'Name is required',
      email: email ? null : 'Email is required',
    };
  }

  const errors = validateUser({ name, email });
  const hasErrors = Object.values(errors).some(Boolean);

  if (hasErrors) {
    return data({ errors }, { status: 400 });
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
          {actionData?.errors?.name && <p style={{ color: 'red' }}>{actionData?.errors?.name}</p>}
          <input name="name" type="text" placeholder="name" />
        </div>
        <div>
          {actionData?.errors?.email && <p style={{ color: 'red' }}>{actionData?.errors?.email}</p>}
          <input name="email" type="email" placeholder="email" />
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
