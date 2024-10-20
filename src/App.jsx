import Topbar from "./components/Topbar.jsx";
import NoteForm from "./components/NoteForm.jsx";
import { useState } from "react";
import { NoteProvider } from "./NoteContext.jsx";

function App() {
  const [isNoteIconClicked, SetIsNoteCreateIconClicked] = useState(false);
  return (
    <>
      <NoteProvider>
        <main className="">
          {/* Searchbar */}
          <Topbar isOnClick={SetIsNoteCreateIconClicked} />
          {isNoteIconClicked ? (
            <NoteForm goBack={SetIsNoteCreateIconClicked} />
          ) : null}
          {/*Passsing SetIsnoteIconClicked to the props of Note form purpose is Just setting false to the SetIsnoteIconClicked*/}
        </main>
      </NoteProvider>
    </>
  );
}
export default App;
