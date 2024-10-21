import { useEffect, useRef } from "react";
import Quill from "quill";
// Import Quill's CSS
import "quill/dist/quill.snow.css";

function Editor({ setContent }) {
  const quillRef = useRef(null); // Create a ref to hold the editor DOM element
  const editorContainerRef = useRef(null); // Ref for the container to initialize Quill in

  useEffect(() => {
    if (quillRef.current === null) {
      const quill = new Quill(editorContainerRef.current, {
        theme: "snow", // or "bubble"
      });

      quillRef.current = quill
    }


    quillRef.current.on('text-change', () => {
      setContent(quillRef.current.root.innerHTML);
      // console.log(quillRef.current.getContents());
      // setContent(quillRef.current.getContents());
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