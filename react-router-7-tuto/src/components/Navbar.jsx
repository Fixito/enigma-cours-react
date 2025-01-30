import { NavLink } from 'react-router';

import { useAuthContext } from '../contexts/AuthContext.jsx';

export default function Navbar() {
  const { token, onLogin, onLogout } = useAuthContext();

  return (
    <nav>
      <h1>React router</h1>

      <ul>
        <li>
          <NavLink to='/'>Accueil</NavLink>
        </li>
        <li>
          <NavLink to='/about'>À propos</NavLink>
        </li>
        <li>
          <NavLink to='/users'>Utilisateurs</NavLink>
        </li>

        {token ? (
          <>
            <li>
              <NavLink to='/dashboard'>Tableau de bord</NavLink>
            </li>
            <li>
              <button onClick={onLogout}>Déconnexion</button>
            </li>
          </>
        ) : (
          <li>
            <button onClick={onLogin}>Connexion</button>
          </li>
        )}
      </ul>
    </nav>
  );
}
