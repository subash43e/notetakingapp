import Quill from "quill";
import { useEffect, useRef } from "react";

function NoteViewer(props) {
  const DisplayValue = props;
  const { noteTitle, noteContent } = DisplayValue.displayFullNotes;
  const { setDisplayFullNotes } = DisplayValue;

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
      quillRef.current.setContents(noteContent);
    }
  }, []);

  return (
    <div className="mx-auto w-full h-screen p-4 rounded-lg bg-white shadow-md flex flex-col"> 

      <div className="flex justify-between"> 
        <h1 className="text-2xl font-bold mb-4 underline">{noteTitle}-</h1>
        <div className="flex gap-3 mx-10">
          <button
            className="underline hover:decoration-blue-500 hover:text-blue-700 p-1 rounded-lg mt-5"
            onClick={() =>
              setDisplayFullNotes((prev) => ({ ...prev, display: false }))
            }
          >
            Close
          </button>
          <button
            className="underline hover:decoration-blue-500 hover:text-blue-700 p-1 rounded-lg mt-5"
            onClick={() => window.location.reload()}
          >
            Edit
          </button>
        </div>
      </div>

      <div 
        ref={editorContainerRef}
        id="editor"
        className="w-full p-2 text-sm text-gray-700 border border-slate-600 grow overflow-y-auto" 
      /> 
    </div>
  );
}

export default NoteViewer;
