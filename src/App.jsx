import Topbar from "./components/Topbar.jsx";
import NoteForm from "./components/NoteForm.jsx";
import { useState } from "react";
import { useNotes } from "./NoteContext.jsx";

function App() {
  const [isNoteIconClicked, SetIsNoteCreateIconClicked] = useState(false);
  const { Notes, deleteNote } = useNotes();

  // No need for mapping here if you're not using the results
  // Notes.map((note) => {
  //   console.log(note.title);
  // });

  return (
    <>
      <main className="">
        <Topbar isOnClick={SetIsNoteCreateIconClicked} />
        {isNoteIconClicked ? ( 
          <NoteForm goBack={SetIsNoteCreateIconClicked} />
        ) : null}

        <div className=" mx-auto mt-10 w-full max-w-[800px] p-4  rounded">
          <h2 className="text-2xl font-bold mb-4">Favorite Notes 🌟</h2>
          {Notes.map((note) => ( 
            <div key={note.id}> 
              {/* Check for note.id directly inside the map */}
              {note.id ? ( 
                <div className="flex flex-col">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">{note.title}</h3>
                    <button
                      // Pass a function to onClick, not the result of the function call
                      onClick={() => deleteNote(note.id)} 
                      className="bg-red-500 text-white p-2 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                  <p className="text-gray-700 text-sm" dangerouslySetInnerHTML={{ __html: note.content }} />
                </div>
              ) : ( 
                // Display error message or handle cases where note.id is missing
                <h1 key="error-note">
                  <span className="text-red-500">Note not found</span>
                </h1>
              )}
            </div>
          ))}
        </div>
      </main>
    </>
  );
}

export default App;
