import { useEffect } from 'react';
import { LabelsList } from './components/LabelsList';

import cancelIcon from './assets/cancel-icon.png';
import checkIcon from './assets/check-icon.png';
import addIcon from './assets/add-icon.png';

export const EditLabelsPresentation = ({
  createLabelInputRef,
  labels,
  labelToEditId,
  setLabelToEditId,
  isCreatingLabel,
  setIsCreatingLabel,
  handleToggle,
  handleLabelCreation,
  closeEditLabels,
}) => {
  useEffect(() => {
    if (labelToEditId) {
      setIsCreatingLabel(false);
    }

    if (isCreatingLabel && !createLabelInputRef.current.readOnly) {
      createLabelInputRef.current.focus();
    }
  }, [isCreatingLabel, labelToEditId]);

  return (
    <>
      <div
        onClick={closeEditLabels}
        className="w-full h-full absolute top-0 left-0 z-10 bg-[#79797B] opacity-[0.6]"
      />
      <div className="border absolute left-[50%] top-[45%] translate-x-[-50%] translate-y-[-50%] z-[300] bg-white max-[550px]:w-[250px]">
        <div className="p-4 flex flex-col gap-4">
          <p className="mt-0 text-md font-medium">Edit labels</p>
          <div className="flex items-center gap-4 justify-between">
            <button onClick={handleToggle}>
              <img
                className="h-4"
                src={isCreatingLabel ? cancelIcon : addIcon}
                alt="cancel edit"
              />
            </button>
            <input
              readOnly={isCreatingLabel ? false : true}
              ref={createLabelInputRef}
              className={`${isCreatingLabel ? 'focus:outline-none focus:border-b focus:border-b-[#afafaf]' : 'outline-none'} placeholder:text-sm w-full text-sm`}
              type="text"
              placeholder="Create new label"
            />
            <button
              onClick={handleLabelCreation}
              className={`${isCreatingLabel ? 'visible' : 'invisible'}`}
            >
              <img className="h-4" src={checkIcon} alt="create label" />
            </button>
          </div>
        </div>
        <ul className="p-4 pt-0 flex flex-col gap-2 max-h-96 overflow-auto">
          {labels.map((label) => {
            return (
              <LabelsList
                key={label._id}
                label={label}
                labelToEditId={labelToEditId}
                setLabelToEditId={setLabelToEditId}
              />
            );
          })}
        </ul>
      </div>
    </>
  );
};
