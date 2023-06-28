/* eslint-disable jsx-a11y/anchor-is-valid */
import useAuth from '../hooks/auth';
import useDarkMode from '../hooks/darkMode';

export default function Header() {
  const { user, signOut } = useAuth();
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  
  return (
    <header>
      <div><h1> Prueba Tecnica para Acid Labs 2023 </h1></div>
      <div>
        <p>{user?.name}</p>
        <a href='/' onClick={signOut}>Cerrar sesion</a>
        <a href='#' onClick={toggleDarkMode}>Cambiar a {isDarkMode ? 'Light' : 'Dark'} </a>
        {/* PULGX ETA ACTUALI_nDO L PGINA!! */}
      </div>
    </header>
  )
}
