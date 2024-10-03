import { useState } from 'react';

const Container = () => {
  const [notes, setNotes] = useState([]);

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: 'New Note',
      content: '',
    };
    setNotes([...notes, newNote]);
  };

  return (
    <div className="container mx-auto mt-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">My Notes</h2>
        <button
          onClick={addNote}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Add Note
        </button>
      </div>
      {notes.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">You don&apos;t have any notes yet. Click &quot;Add Note&quot; to get started!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <div key={note.id} className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1">
              <div className="bg-blue-100 px-4 py-2">
                <h3 className="text-lg font-semibold text-blue-800">{note.title}</h3>
              </div>
              <div className="p-4">
                <p className="text-gray-600">{note.content || 'Empty note'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Container;