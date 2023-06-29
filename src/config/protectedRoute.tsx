import { useEffect, useState, useContext } from 'react';
import { Route } from 'react-router-dom';
import UserContext from '../contexts/userContext';

const ProtectedRoute = ({ component: Component, ...rest }: any) => {
  const [isLoading, setLoading] = useState(true);
  const { user, signIn } = useContext(UserContext);

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
    setLoading(true);
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
             <div className='login_div'>
             <h1>Debe iniciar sesion</h1>
              <button onClick={handleSubmit}>Iniciar sesion</button>
             </div>
            </>
          )}
      />
    </>
  )
}

export default ProtectedRoute;
