"use client"
import './App.css'
import JokesTable from './components/table';
import { Jokes as JokePage } from './pages/jokes';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import ProtectedRoute from './config/protectedRoute';
import MainContainer from './containers/mainContainer';
import ErrorComponent from './components/errorComponent';

function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorComponent} onError={(error: Error) => {
      console.error(error)
    }}>
      <MainContainer>
        <Router>
          <Switch>
            <ProtectedRoute exact path="/" component={JokesTable} />
            <ProtectedRoute exact path="/jokes/" component={JokesTable} />
            <ProtectedRoute path="/joke/:jokeId" component={JokePage} />
            <ProtectedRoute path="/joke" component={JokePage} />
          </Switch>
        </Router>
      </MainContainer>
    </ErrorBoundary>
  );
}

export default App;
