import { useEffect } from 'react';

export const NoteFormModalButton = ({
  noteFormModalButtonRef,
  openModal,
  openModalOnInput,
}) => {
  useEffect(() => {
    noteFormModalButtonRef.current.focus();
  }, []);

  return (
    <div className="w-[600px] m-auto mt-4">
      <input
        type="text"
        onChange={(e) => openModalOnInput(e)}
        onClick={openModal}
        ref={noteFormModalButtonRef}
        className="w-full border p-3 shadow-lg focus:outline-none rounded"
        placeholder="Take a note..."
      />
    </div>
  );
};
