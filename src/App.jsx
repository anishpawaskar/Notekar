import './App.css';
import { Navbar } from './components/Navbar';
import { NoteForm } from './components/NoteForm';
import { Notes } from './components/Notes';

function App() {
  return (
    <>
      <Navbar />
      <NoteForm />
      <Notes />
    </>
  );
}

export default App;
