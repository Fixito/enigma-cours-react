import { Link } from 'react-router';

export default function NoMatch() {
  return (
    <section>
      <h1>Oops! It&apos;s a dead end</h1>
      <Link to='/'>Back Home</Link>
    </section>
  );
}
