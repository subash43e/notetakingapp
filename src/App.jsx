import Topbar from "./components/Topbar.jsx";
import NoteForm from "./components/NoteForm.jsx";
import { useState } from "react";
function App() {
  const [isNoteCreate, setNoteCreate] = useState(false);
  return (
    <>
      <main className="">
        {/* Searchbar */}
        <Topbar isOnClick={setNoteCreate} />
        {isNoteCreate ? <NoteForm isOnClick={setNoteCreate} /> : null}
      </main>
    </>
  );
}
export default App;
