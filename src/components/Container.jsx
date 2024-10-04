import { useState, useEffect, useCallback } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';

const NoteItem = ({ note, index, moveNote, editNote, deleteNote }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'NOTE',
    item: { id: note.id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: 'NOTE',
    hover: (draggedItem, monitor) => {
      if (!monitor.isOver({ shallow: true })) {
        return;
      }
      if (draggedItem.index !== index) {
        moveNote(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  return (
    <div 
      ref={(node) => drag(drop(node))} 
      className={`bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 ${isDragging ? 'opacity-50' : ''}`}
    >
      <div className="bg-blue-100 px-4 py-2 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-blue-800">{note.title}</h3>
        <div>
          <button
            onClick={() => editNote(note)}
            className="text-blue-600 hover:text-blue-800 mr-2"
          >
            Edit
          </button>
          <button
            onClick={() => deleteNote(note.id)}
            className="text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </div>
      </div>
      <div className="p-4">
        <p className="text-gray-600">{note.content || 'Empty note'}</p>
      </div>
    </div>
  );
};

NoteItem.propTypes = {
  note: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    content: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  moveNote: PropTypes.func.isRequired,
  editNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
};

const Container = ({ isAddingNote, setIsAddingNote, searchTerm }) => {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const [isCreatingNewNote, setIsCreatingNewNote] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes')) || [];
    setNotes(savedNotes);
  }, []);

  const saveNotesToLocalStorage = useCallback((updatedNotes) => {
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
  }, []);

  const addNote = () => {
    const newNote = {
      id: Date.now(),
      title: '',
      content: '',
    };
    setEditingNote(newNote);
    setIsCreatingNewNote(true);
  };

  const editNote = (note) => {
    setEditingNote(note);
    setIsCreatingNewNote(false);
  };

  const saveNote = (id, title, content) => {
    let updatedNotes;
    if (isCreatingNewNote) {
      updatedNotes = [...notes, { id, title, content }];
    } else {
      updatedNotes = notes.map((note) =>
        note.id === id ? { ...note, title, content } : note
      );
    }
    setNotes(updatedNotes);
    saveNotesToLocalStorage(updatedNotes);
    setEditingNote(null);
    setIsCreatingNewNote(false);
  };

  const deleteNote = (id) => {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    saveNotesToLocalStorage(updatedNotes);
    if (editingNote && editingNote.id === id) {
      setEditingNote(null);
    }
  };

  const moveNote = useCallback((fromIndex, toIndex) => {
    setNotes((prevNotes) => {
      const updatedNotes = [...prevNotes];
      const [movedNote] = updatedNotes.splice(fromIndex, 1);
      updatedNotes.splice(toIndex, 0, movedNote);
      saveNotesToLocalStorage(updatedNotes);
      return updatedNotes;
    });
  }, [saveNotesToLocalStorage]);

  useEffect(() => {
    if (isAddingNote) {
      addNote();
      setIsAddingNote(false);
    }
  }, [isAddingNote]);

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="container mx-auto mt-8 px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">My Notes</h2>
        </div>
        {filteredNotes.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">
              {searchTerm ? "No notes match your search." : "You don't have any notes yet. Click 'Add Note' in the top bar to get started!"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNotes.map((note, index) => (
              <NoteItem
                key={note.id}
                note={note}
                index={index}
                moveNote={moveNote}
                editNote={editNote}
                deleteNote={deleteNote}
              />
            ))}
          </div>
        )}
        {editingNote && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
            <div className="bg-white p-5 rounded-lg shadow-xl w-full max-w-md">
              <h3 className="text-xl font-semibold mb-4">
                {isCreatingNewNote ? 'Create New Note' : 'Edit Note'}
              </h3>
              <input
                type="text"
                value={editingNote.title}
                onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
                className="w-full p-2 mb-4 border rounded"
                placeholder="Title"
              />
              <textarea
                value={editingNote.content}
                onChange={(e) => setEditingNote({ ...editingNote, content: e.target.value })}
                className="w-full p-2 mb-4 border rounded h-32"
                placeholder="Content"
              ></textarea>
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    setEditingNote(null);
                    setIsCreatingNewNote(false);
                  }}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full mr-2"
                >
                  Cancel
                </button>
                <button
                  onClick={() => saveNote(editingNote.id, editingNote.title, editingNote.content)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
                >
                  {isCreatingNewNote ? 'Create' : 'Save'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DndProvider>
  );
};

Container.propTypes = {
  isAddingNote: PropTypes.bool.isRequired,
  setIsAddingNote: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
};

export default Container;