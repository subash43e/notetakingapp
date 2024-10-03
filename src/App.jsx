import Topbar from './components/Topbar';
import Container from './components/Container';
import './App.css';
function App() {
  return (
    <div className="App bg-gray-100 min-h-screen flex flex-col">
      <Topbar />
      <main className="flex-grow">
        <Container />
      </main>
    </div>
  );
}

export default App;