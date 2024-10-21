import Editor from "./Editor";
import { useNotes } from "../NoteContext";
import { useRef, useState } from "react";

const NoteForm = ({ goBack }) => {
  const titleRef = useRef();
  const [content, setContent] = useState("");
  const { addNote } = useNotes();

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = titleRef.current.value;

    console.log(content);
    
    addNote({ id: Date.now(), title, content });
    titleRef.current.value = "";
    setContent("");
    goBack((prev) => !prev);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-90 backdrop-blur-sm">
      <div className="w-full max-w-[1100px] p-8 bg-white rounded-lg shadow-md"> {/* Increased max-width and padding */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          {/* Increased title size and margin bottom */}
          Create a Note
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Increased space between form elements */}
          <div>
            <label
              htmlFor="title"
              className="block text-gray-700 font-bold mb-2"
            >
              Title
            </label>
            <input
              type="text"
              ref={titleRef}
              id="title"
              className="w-full p-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-orange-500 focus:ring-opacity-50"
              placeholder="Enter title"
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-gray-700 font-bold mb-2"
            >
              Content
            </label>
            <Editor setContent={setContent} />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="px-8 py-3 text-lg bg-orange-500 text-white font-bold rounded-md hover:bg-orange-600 focus:outline-none focus:ring focus:ring-orange-300"
            >
              Create Note
            </button>
            <button
              type="button"
              onClick={() => goBack((prev) => !prev)}
              className="px-6 py-3 text-lg text-red-600 font-bold hover:underline"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;

