import { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import { IUser } from '../interfaces/jokes';
import useAuth from '../hooks/auth';

const ProtectedRoute = ({ component: Component, ...rest }: any) => {
  const [isLoading, setLoading] = useState(true);
  const { user, signIn } = useAuth();

  useEffect(() => {
    loadUser()
  }, [])

  const loadUser = async () => {
    setTimeout(() => {
      setLoading(false);
    }, 2500)
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setTimeout(() => {
      setLoading(false);
      signIn({ name: 'acid labs' });
    }, 1500)
  };

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
              <button onClick={handleSubmit}>Iniciar sesion</button>
            </>
          )}
      />
    </>
  )
}

export default ProtectedRoute;
