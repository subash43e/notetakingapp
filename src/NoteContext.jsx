import {
  useState,
  createContext,
  useEffect,
  useContext,

} from "react";

const NoteContext = createContext();

export const NoteProvider = ({ children }) => {
  const [Notes, SetNotes] = useState([]);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("notes")) || [];
    SetNotes(savedNotes);
  }, []);

  const savingNotes = (updatingNotes) => {
    SetNotes(updatingNotes);
    localStorage.setItem("notes", JSON.stringify(updatingNotes));
  };

  const addNote = (newNote) => {
    const updatedNotes = [...Notes, newNote];
    savingNotes(updatedNotes);
  };

  const editNote = (id, updatedNote) => {
    const updatedNotes = Notes.map((note) =>
      note.id === id ? { ...note, ...updatedNote } : note,
    );
    savingNotes(updatedNotes);
  };

  const deleteNote = (id) => {
    const updatedNotes = Notes.filter((note) => note.id !== id);
    savingNotes(updatedNotes);
  };

  return (
    <NoteContext.Provider value={{ Notes, addNote, editNote, deleteNote }}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNotes = () => useContext(NoteContext);
