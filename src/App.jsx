import Topbar from "./components/Topbar.jsx";
import NoteForm from "./components/NoteForm.jsx";
import { useEffect, useRef, useState } from "react";
import { useNotes } from "./NoteContext.jsx";
import NoteViewer from "./NoteViewer.jsx";
import Quill from "quill";

function App() {
  const [isNoteIconClicked, SetIsNoteCreateIconClicked] = useState(false);
  const [displayFullNote, setDisplayFullNote] = useState({
    display: false,
    noteid: "",
    noteContent: ""
  });

  const MiniViewer = ({ content }) => {
    const quillRef = useRef(null);
    const editorContainerRef = useRef(null);

    useEffect(() => {
      if (quillRef.current === null) {
        const quill = new Quill(editorContainerRef.current, {
          theme: "snow",
          modules: {
            toolbar: false,
          },
          readOnly: true,
        });
        quillRef.current = quill;
        quillRef.current.setContents(content);
      }
    }, []);
    return (
      <>
        <div
          ref={editorContainerRef}
          id="editor"
          className="text-gray-700 text-sm line-clamp-2 pt-3"
        />
      </>
    )
  }

  const { Notes, deleteNote } = useNotes();
  return (
    <>
      <main className="">
        {displayFullNote.display ? (
          <NoteViewer displayFullNote={displayFullNote} setDisplayFullNote={setDisplayFullNote} />
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
                    <div key={note.id} className="pb-4 my-5">
                      <div className="flex flex-col">
                        <div className="flex justify-between items-center">
                          <h3
                            className="text-xl font-bold cursor-pointer hover:underline"
                            onClick={() => {
                              setDisplayFullNote({
                                display: true,
                                noteid: note.id,
                                noteTitle: note.title,
                                noteContent: note.content
                              });
                            }}
                          >
                            {note.title}
                          </h3>
                          <button
                            onClick={() => deleteNote(note.id)}
                            className="bg-red-500 text-white p-2 rounded-lg mb-4"
                          >
                            Delete
                          </button>
                        </div>
                        <MiniViewer content={note.content} />
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
