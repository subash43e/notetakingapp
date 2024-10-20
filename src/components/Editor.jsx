import { useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css"; // Import Quill's CSS

function Editor({ setContent }) {
  const quillRef = useRef(null); // Create a ref to hold the editor DOM element
  const editorContainerRef = useRef(null); // Ref for the container to initialize Quill in

  useEffect(() => {
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
      setContent(quillRef.current.root.innerHTML);
    }

    quillRef.current.on('text-change', () => {
      setContent(quillRef.current.root.innerHTML);
    });
  }, []);


  return (
    <>
      <div
        ref={editorContainerRef}
        id="editor"
        className="w-full p-2 text-sm text-gray-700 h-40 mb-5"
      />
    </>
  );
}


export default Editor;