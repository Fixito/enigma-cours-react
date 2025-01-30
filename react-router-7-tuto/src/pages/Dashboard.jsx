import { useAuthContext } from '../contexts/AuthContext.jsx';

export default function Dashboard() {
  const { token } = useAuthContext();

  return (
    <>
      <h2>Tableau de bord (Protégé)</h2>
      <p>Authentifié en tant que : {token}</p>
    </>
  );
}
