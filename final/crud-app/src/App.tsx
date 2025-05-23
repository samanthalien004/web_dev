import { useEffect, useState } from "react";
import { db } from "./firebase";
import {
  doc,
  collection,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  addDoc,
} from "firebase/firestore";

type Note = {
  id: string;
  content: string;
}

function App() {
  const [notes, setNotes] = useState<Note[]>([]);     //all notes from db
  const [newNote, setNewNote] = useState("");         //text of the new note
  const [editNoteId, setEditNoteId] = useState<string|null>(null); //tracks the note ids that are being edited
  const [editContent, setEditContent] = useState("");

  const notesCollection = collection(db, "notes");

  //READ - fetch all notes from firestore
  const fetchNotes = async () => {
    try {
      const data = await getDocs(notesCollection);
      const formattedNotes = data.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Note[];
      setNotes(formattedNotes);
    } catch (error) {
      console.error('Error fetching notes');
    }
  };

  useEffect(() => {
    fetchNotes();       //load notes from firestore
  },[]);


  //CREATE - add a new note
  const addNote = async () => {
    if(!newNote.trim()) return;

    try {
      await addDoc(notesCollection, {content: newNote});
      setNewNote("");
      fetchNotes();
    } catch (error) {
      console.error('Error adding notes');
    }
  }


  //DELETE - remove note from db
  const deleteNote = async (id:string) => {
    try {
      await deleteDoc(doc(db, "notes", id));
      fetchNotes();
    } catch (error) {
      console.error("Error deleting note");
    }
  }


  //UPDATE - save edited note to firestore
  const updateNote = async () => {
    if(!editNoteId) return;
    try {
      await updateDoc(doc(db, "notes", editNoteId), { content: editContent });

      setNotes(prevNotes =>               
        prevNotes.map(note => 
          note.id === editNoteId ? {...note, content:editContent} : note      //display updates
        )
      );

      setEditNoteId(null);
      setEditContent("");
    } catch (error) {
      console.error("Error updating note");
    }
  }

  return (
    <div className="max-w-xl mx-auto mt-10 p-4">
      <h1 className="text-3xl font-bold mb-4">📝 Notes</h1>

      <div className="mb-4">
        <input
          value={newNote}
          onChange={e => setNewNote(e.target.value)} //update `newNote` state
          placeholder= "Write a new note..."
          className= "border rounded px-2 py-1 mr-2 w-2/3 h-24"
        />
        <button
          onClick={addNote}
          className= "bg-blue-500 text-white px-3 py-1 rounded"
        >
          Add
        </button>
      </div>

      <ul className="space-y-3">
        {notes.map(note => (
          <li
            key={note.id}
            className="flex items-center justify-between border p-2 rounded"
          >
            {editNoteId === note.id ? (
              <>
                <input
                  value={editContent}
                  onChange={e => setEditContent(e.target.value)}
                  className="border px-2 py-1 w-2/3"
                />
                <button
                  onClick={updateNote}
                  className="bg-green-500 text-white px-2 py-1 ml-2 rounded"
                >
                  Save
                </button>
              </>
            ) : (
              <>
                <span>{note.content}</span>
                <div>
                  <button
                    onClick={() => {
                      setEditNoteId(note.id);     //store which note is being edited
                      setEditContent(note.content); //pre-fill input with existing content
                    }}
                    className="text-yellow-500 mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteNote(note.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

