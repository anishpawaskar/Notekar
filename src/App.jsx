import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar';
import { Notes } from './components/Notes';
import { EditNoteForm } from './components/EditNoteForm';
import { Layout } from './components/Layout';
import { Login } from './components/Login';

function App() {
  return (
    <>
      <Routes>
        <Route path="/notes" element={<Layout />}>
          <Route index element={<Notes />} />
          <Route path="/notes/:noteId" element={<EditNoteForm />} />
        </Route>
        <Route path="/" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
