"use client"
import './App.css'
import Table from './components/table';
import { Jokes as JokePage } from './pages/jokes';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import ProtectedRoute from './config/protectedRoute';
import MainContainer from './containers/mainContainer';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorComponent from './components/errorComponent';

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorComponent} onError={(error: Error) => {
      console.error(error)
    }}>
      <MainContainer>
        <Router>
          <Switch>
            <ProtectedRoute exact path="/" component={Table} />
            <ProtectedRoute exact path="/jokes/" component={Table} />
            <ProtectedRoute path="/joke/:jokeId" component={JokePage} />
            <ProtectedRoute path="/joke" component={JokePage} />
          </Switch>
        </Router>
      </MainContainer>
    </ErrorBoundary>
  );
}

export default App;
