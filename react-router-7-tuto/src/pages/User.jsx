import { Link, useOutletContext, useParams } from 'react-router';

export default function User({ onRemoveUser }) {
  const { userId } = useParams();
  const { users } = useOutletContext();

  const user = users.find((user) => user.id === userId);

  return (
    <>
      <h3>Utilisateur (Publique) : {userId}</h3>

      {user ? (
        <div>
          <p>Nom : {user.fullName}</p>
          <button onClick={() => onRemoveUser(userId)}>Supprimer</button>
        </div>
      ) : (
        <p>Utilisateur introuvable</p>
      )}

      <Link to='/users'>Retourner à la liste des utilisateurs</Link>
    </>
  );
}
