import Header from '../components/header';
import UserProvider from '../contexts/userProvider';

export default function MainContainer({ children }: any) {
  return (
    <div className="App">
      <UserProvider>
        <Header />
        <main>
          {children}
        </main>
      </UserProvider>
    </div>
  );
}
