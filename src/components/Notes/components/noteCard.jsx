import React from 'react';
import { Link } from 'react-router-dom';

export const NoteCard = ({ note }) => {
  return (
    <Link className="block max-w-[250px] mt-4 mx-auto" to={`/${note._id}`}>
      <div
        style={{
          background: note.theme?.backgroundColor,
        }}
        className="max-w-[250px] max-h-[300px]  flex flex-col gap-4 mt-4 mx-auto rounded-md p-4 shadow-md border"
      >
        {note.title && (
          <p className="font-medium whitespace-pre-wrap break-words max-h-[140px] overflow-hidden">
            {note.title}
          </p>
        )}
        {note.description && (
          <p className="text-lg whitespace-pre-wrap break-words max-h-[140px] overflow-hidden ">
            {note.description}
          </p>
        )}
        {note.title === '' && note.description === '' && (
          <p className="m-0 text-xl">Empty note</p>
        )}
      </div>
    </Link>
  );
};
