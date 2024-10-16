import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Import Quill's CSS

export default function Editor({ saveData, watchData }) {
  const quillRef = useRef(null); // Create a ref to hold the editor DOM element
  const editorContainerRef = useRef(null); // Ref for the container to initialize Quill in

  useEffect(() => {
    // Check if Quill is already initialized
    if (quillRef.current === null) {
      quillRef.current = new Quill(editorContainerRef.current, {
        theme: "snow", // or "bubble"
        modules: {
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            ["link", "image"],
            [{ list: "ordered" }, { list: "bullet" }],
          ],
        },
        readOnly: false,
      });
    }
  }, []); // Empty dependency array ensures it only runs once

  return (
    <>
      <div
        ref={editorContainerRef}
        id="editor"
        value={watchData}
        onChange={(e) => saveData(e.target.value)}
        className="w-full p-2 pl-10 text-sm text-gray-700 h-40 mb-5"
        placeholder="Enter content"
      />
    </>
  );
}

// use state based its throwing ui error.

{
  /*
"import { useEffect, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Import Quill's css

export default function Editor() {
  const [isEditor, setEditor] = useState(null);

  useEffect(() => {
    const quill = new Quill("#editor", {
      theme: "snow", // or "bubble"
      modules: {
        toolbar: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline"],
          ["link", "image"],
          [{ list: "ordered" }, { list: "bullet" }],
        ],
      },
      readOnly: false,
    });
    setEditor(quill);
  }, []);
  return (
    <>
      <div id="editor" />
    </>
  );
}
"
*/
}
