import React from 'react';
import { Link } from 'react-router-dom';

export const NoteCard = ({ note }) => {
  return (
    <Link to={`/${note.id}`}>
      <div className="m-0 max-w-[250px] flex flex-col gap-4 mt-4 mx-auto rounded-md p-4 shadow-md border">
        {note.title && <p className="font-medium">{note.title}</p>}
        {note.description && <p className="text-lg">{note.description}</p>}
      </div>
    </Link>
  );
};
