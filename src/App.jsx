import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar';
import { Notes } from './components/Notes';
import { EditNoteForm } from './components/EditNoteForm';
import { Layout } from './components/Layout';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Notes />} />
          <Route path="/:noteId" element={<EditNoteForm />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
