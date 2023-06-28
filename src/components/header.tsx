/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from 'react';
import UserContext from '../contexts/userContext';
import useAuth from '../hooks/auth';
import useDarkMode from '../hooks/darkMode';

export default function Header() {
  const { user, signOut } = useContext(UserContext);
  // const { user, signOut } = useAuth();
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
            let aa = document.getElementById('dialog-result');
            if (aa) aa.innerText = '';
            let bb: any = document.getElementById('dialog');
            if (bb) bb.showModal();
          }}
        >Cerrar sesion</a>
        <a href='#' onClick={toggleDarkMode}>Cambiar a {isDarkMode ? 'Light' : 'Dark'} </a>
      </div>

    </header>
  )
}
