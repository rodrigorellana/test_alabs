import Header from '../components/header';
export default function MainContainer({ children }: any) {
  return (
    <>
      <div className="App">
        <Header/>
        <main>
          {children}
        </main>
      </div>
    </>
  );
}
