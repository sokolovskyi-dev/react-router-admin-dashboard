import { data, Form, redirect, useActionData, useNavigation } from 'react-router-dom';

import { getSession, login } from '@/services/auth';

export async function loader() {
  const session = await getSession();
  if (session) throw redirect('/dashboard');
  return null;
}

export async function action({ request }) {
  const formData = await request.formData();
  const email = formData.get('email');

  if (!email) {
    return data({ fieldErrors: { email: 'Введите email' } }, { status: 400 });
  }
  try {
    await login({ email });
    return redirect('/dashboard');
  } catch (e) {
    return data({ formError: e?.message ?? 'Login failed' }, { status: e?.status ?? 400 });
  }
}

export function Component() {
  const navigation = useNavigation();
  const actionData = useActionData();
  return (
    <div style={{ padding: 24, maxWidth: 420 }}>
      {navigation.state !== 'idle' && <h1>Loading</h1>}

      <Form method="post" replace>
        <label style={{ display: 'block' }}>
          Email{' '}
          <input
            name="email"
            type="email"
            autoComplete="email"
            style={{ display: 'block', width: '100%', marginTop: 8 }}
          />
        </label>

        {actionData?.fieldErrors?.email ? (
          <p style={{ color: 'crimson', marginTop: 8 }}>{actionData.fieldErrors.email}</p>
        ) : null}
        {actionData?.formError ? <p style={{ color: 'crimson' }}>{actionData.formError}</p> : null}

        <button style={{ marginTop: 12 }} type="submit">
          Sign in
        </button>
      </Form>
    </div>
  );
}
