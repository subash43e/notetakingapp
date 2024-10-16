import Topbar from "./components/Topbar.jsx";
import NoteForm from "./components/NoteForm.jsx";
import { useState, createContext } from "react";

function App() {
  const [isNoteIconClicked, SetIsNoteCreateIconClicked] = useState(false);

  const [useSavingNote, SetIsSavingNote] = useState("");

  return (
    <>
      <main className="">
        {/* Searchbar */}
        <Topbar isOnClick={SetIsNoteCreateIconClicked} />
        {isNoteIconClicked ? (
          <NoteForm goBack={SetIsNoteCreateIconClicked} />
        ) : null}
        {/*Passsing SetIsnoteIconClicked to the props of Note form purpose is Just setting false to the SetIsnoteIconClicked*/}
      </main>
    </>
  );
}
export default App;
