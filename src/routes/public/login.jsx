import { data, Form, redirect, useActionData, useNavigation } from 'react-router-dom';

import { createSession } from '@/api/auth';

export async function action({ request }) {
  const formData = await request.formData();
  const email = String(formData.get('email') || '').trim();

  if (!email) {
    return data({ fieldErrors: { email: 'Введите email' } }, { status: 400 });
  }

  createSession({ email });

  return redirect('/dashboard');
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

        <button style={{ marginTop: 12 }} type="submit">
          Sign in
        </button>
      </Form>
    </div>
  );
}
