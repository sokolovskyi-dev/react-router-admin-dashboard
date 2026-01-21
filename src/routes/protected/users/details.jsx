import { Form, useParams } from 'react-router-dom';

export function Component() {
  const { userId } = useParams();
  return (
    <>
      <h2>Details user {userId}</h2>
      <Form>
        <button type="submit">Edit</button>
      </Form>
    </>
  );
}
