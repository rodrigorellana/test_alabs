import { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { IUser } from '../interfaces/jokes';

const ProtectedRoute = ({ component: Component, ...rest }: any) => {
  const [isLoading, setLoading] = useState(true);
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    loadUser()
  }, [])

  const loadUser = async () => {
    setTimeout(() => {
      setLoading(false);
    }, 2500)
  }

  return (
    <>
      <Route
        {...rest}
        render={(props) =>
          isLoading && !user ? (
            <h1>Cargando usuario...</h1>
          ) : user ? (
            <Component {...props} />
          ) : (
            <>
              <h1>Debe iniciar sesion</h1>
              <button onClick={() => setUser({ name: 'acid labs'}) }>Iniciar sesion</button>
            </>
          )}
      />
    </>
  )
}

export default ProtectedRoute;
