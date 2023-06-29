/* eslint-disable jsx-a11y/anchor-is-valid */
import { useContext } from 'react';
import UserContext from '../contexts/userContext';
import useDarkMode from '../hooks/darkMode';

export default function Header() {
  const { user, signOut } = useContext(UserContext);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return user && (
    <header>
      <dialog id="dialog">
        <header>Acid Labs</header>
        <form method="dialog">
          <p>¿Desea cerrar sesión?</p>
          <menu>
            <button onClick={signOut}>Si</button>
            <button >No</button>
          </menu>
        </form>
      </dialog>

      <div><h1> Prueba Tecnica para Acid Labs 2023 </h1></div>
      <div>
        <p>{user?.name}</p>
        <span id="dialog-result"></span>
        <a href='#' id="dialog-trigger" // TODO PULGX hacer un useDialog
          onClick={() => {
            let dialog: any = document.getElementById('dialog');
            if (dialog) dialog.showModal();
          }}
        >Cerrar sesion</a>
        <a href='#' onClick={toggleDarkMode}>Cambiar a {isDarkMode ? 'Light' : 'Dark'} </a>
      </div>

    </header>
  )
}
