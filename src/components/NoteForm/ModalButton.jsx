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
    <>
      <div className="w-[400px] sm:w-[600px] max-[450px]:w-[300px]">
        <input
          type="text"
          onChange={(e) => openModalOnInput(e)}
          onClick={openModal}
          ref={noteFormModalButtonRef}
          className="w-full border py-2 px-3 shadow-lg focus:outline-none rounded"
          placeholder="Take a note..."
        />
      </div>
    </>
  );
};
