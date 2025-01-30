import { Link, Outlet, useSearchParams } from 'react-router';

export default function Users({ users }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get('name') || '';

  const handleSearch = (e) => {
    const name = e.target.value;

    if (name) {
      setSearchParams({ name });
    } else {
      setSearchParams({});
    }
  };

  return (
    <>
      <h2>Utilisateurs (Publique)</h2>

      <form>
        <label htmlFor='search'>Rechercher un utilisateur : </label>
        <input
          type='search'
          id='search'
          value={searchTerm}
          onChange={handleSearch}
        />
      </form>

      <ul>
        {users
          .filter((user) =>
            user.fullName.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map((user) => {
            const { id, fullName } = user;

            return (
              <li key={id}>
                <Link to={id}>{fullName}</Link>
              </li>
            );
          })}
      </ul>

      <Outlet context={{ users }} />
    </>
  );
}
