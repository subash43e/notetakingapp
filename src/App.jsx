import { useState, useCallback } from "react";
import Topbar from "./components/Topbar";
import Container from "./components/Container";
import "./App.css";

function App() {
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddNote = () => {
    setIsAddingNote(true);
  };

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  return (
    <div className="App bg-gray-100 min-h-screen flex flex-col">
      <Topbar onAddNote={handleAddNote} onSearch={handleSearch} />
      <main className="flex-grow">
        <Container 
          isAddingNote={isAddingNote} 
          setIsAddingNote={setIsAddingNote} 
          searchTerm={searchTerm}
        />
      </main>
    </div>
  );
}

export default App;

