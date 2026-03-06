import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">Madurai Film Library</Link>
      <ul className="navbar-links">
        <li><NavLink to="/" end className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink></li>
        <li><NavLink to="/collections" className={({ isActive }) => isActive ? 'active' : ''}>Collections</NavLink></li>
        {currentUser ? (
          <>
            <li><NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>Profile</NavLink></li>
            <li><button className="navbar-logout" onClick={handleLogout}>Log Out</button></li>
          </>
        ) : (
          <>
            <li><NavLink to="/login" className={({ isActive }) => isActive ? 'active' : ''}>Log In</NavLink></li>
            <li><NavLink to="/signup" className={({ isActive }) => isActive ? 'active' : ''}>Sign Up</NavLink></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
