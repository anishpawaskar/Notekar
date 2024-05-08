import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar';
import { NoteForm } from './components/NoteForm';
import { Notes } from './components/Notes';
import { EditNoteForm } from './components/EditNoteForm';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<NoteForm />}>
          <Route index element={<Notes />} />
          <Route path="/:noteId" element={<EditNoteForm />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
