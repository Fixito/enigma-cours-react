import { NavLink } from 'react-router';

export default function Navbar() {
  return (
    <nav>
      <div>
        <span>Cocktails API</span>

        <ul>
          <li>
            <NavLink to='/'>Home</NavLink>
          </li>
          <li>
            <NavLink to='/about'>About</NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
