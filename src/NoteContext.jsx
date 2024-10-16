import {
  useState,
  createContext,
  useEffect,
  useContext,
  Children,
} from "react";

const NoteContext = createContext();

export const NoteProvider = () => {
  const [useNotes, SetNotes] = useState([]);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    SetNotes(savedNotes);
  }, []);

  const savedNotes = (updatedNotes) => {
    SetNotes(updatedNotes);
    localStorage.setItem("notes", JSON.stringify(useNotes));
  };

  const addNote = (newNote) => {
    const updatedNotes = [...useNotes, newNote];
    savedNotes(updatedNotes);
  };

  const editNote = (id, updatedNote) => {
    const updatedNotes = useNotes.map((note) =>
      note.id === id ? { ...note, ...updatedNote } : note,
    );
    savedNotes(updatedNotes);
  };

  const deleteNote = (id) => {
    const updatedNotes = useNotes.filter((note) => note.id !== id);
    savedNotes(updatedNotes);
  };

  return (
    <NoteContext.Provider value={{ useNotes, addNote, editNote, deleteNote }}>
      {Children}
    </NoteContext.Provider>
  );
};

export const NotesUsing = () => useContext(NoteContext);
