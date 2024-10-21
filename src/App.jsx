import Topbar from "./components/Topbar.jsx";
import NoteForm from "./components/NoteForm.jsx";
import { useState } from "react";
import { useNotes } from "./NoteContext.jsx";

function App() {
  const [isNoteIconClicked, SetIsNoteCreateIconClicked] = useState(false);
  const [displayFullNotes, setDisplayFullNotes] = useState(false);

  const { Notes, deleteNote } = useNotes();
  return (
    <>
      <main className="">
        {/* Conditionally render either the overlay or the notes */}
        {displayFullNotes ? ( 
          <div className="fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-90 backdrop-blur-sm">
            {/* Writing display full notes here */}
            {/* keypoints of the components.
            - scroller for the notes scrolling 
            - notes printing option for printing the notes
            */}

            <div className="w-full max-w-[1100px] p-8 bg-white rounded-lg shadow-md">notes</div>
          </div>
        ) : (
          <>
            <Topbar isOnClick={SetIsNoteCreateIconClicked} />
            {isNoteIconClicked ? (
              <NoteForm goBack={SetIsNoteCreateIconClicked} />
            ) : (
              <div className="mx-auto mt-10 w-full max-w-[800px] p-4 rounded">
                <h2 className="text-2xl font-bold mb-4">Favorite Notes 🌟</h2>
                {Notes.length === 0 ? ( 
                  <h1 key="error-note">
                    <span className="text-red-500">Note not found</span>
                  </h1>
                ) : (
                  Notes.map((note) => (
                    <div key={note.id} className="border-b border-gray-700 pb-4 my-5">
                      <div className="flex flex-col">
                        <div className="flex justify-between items-center">
                          <h3
                            className="text-xl font-bold cursor-pointer hover:underline"
                            onClick={() => {
                              setDisplayFullNotes(!displayFullNotes);
                            }}
                          >
                            {note.title}
                          </h3>
                          <button
                            onClick={() => deleteNote(note.id)} 
                            className="bg-red-500 text-white p-2 rounded-lg"
                          >
                            Delete
                          </button>
                        </div>
                        <p
                          className="text-gray-700 text-sm line-clamp-2 pt-3"
                          dangerouslySetInnerHTML={{ __html: note.content }}
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        )} 
      </main>
    </>
  );
}

export default App;
