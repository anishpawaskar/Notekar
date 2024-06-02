import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Navbar } from './components/Navbar';
import { Notes } from './components/Notes';
import { EditNoteForm } from './components/EditNoteForm';
import { Layout } from './components/Layout';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { PrivateRoute } from './components/Utils Components/PrivateRoute';

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path="/notes" element={<Layout />}>
            <Route index element={<Notes />} />
            <Route path="/notes/:noteId" element={<EditNoteForm />} />
          </Route>
        </Route>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
}

export default App;
