import { useState } from "react";

const NoteForm = ({ isOnClick }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add note creation logic here
    console.log("Note created:", { title, content });
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center backdrop-blur-lg bg-gray-500 opacity-90">
      <div className="w-full max-w-lg p-4 bg-white rounded">
        <h2 className="text-2xl font-bold mb-4">Create a Note</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="title" className="block mb-2">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 pl-10 text-sm text-gray-700"
            placeholder="Enter title"
          />
          <label htmlFor="content" className="block mb-2">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 pl-10 text-sm text-gray-700 h-40 mb-5"
            placeholder="Enter content"
          />
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            >
              Create Note
            </button>

            <button
              className="bg-red-600 text-white p-2 rounded-lg "
              onClick={() => isOnClick((prev) => !prev)}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;
