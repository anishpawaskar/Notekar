import { useRef } from 'react';
import searchIcon from './assets/search-icon.png';

export const LabelsPresentation = ({
  labels,
  handleLabel,
  labelsToAdd,
  closeLabels,
}) => {
  return (
    <>
      <div
        onClick={closeLabels}
        className="w-full h-full absolute top-0 left-0 z-10 rounded-lg"
      />
      <div className="w-56 shadow-xl rounded border flex flex-col gap-2 absolute bottom-[-85px] left-24 z-50 bg-white">
        <div className="p-3 flex flex-col gap-1">
          <p className="text-sm font-medium">Label note</p>
          <div className="flex justify-between">
            <input
              className="m-0 placeholder:text-sm outline-none text-sm w-full"
              placeholder="Enter label name"
            />
            <button>
              <img className="h-4 w-4" src={searchIcon} alt="search-icon" />
            </button>
          </div>
        </div>
        <div className="flex flex-col items-start mb-3">
          {labels.map((label) => {
            const labelCheckboxRef = useRef(null);
            const isLabelAdded = labelsToAdd.find(
              (addedLabel) => addedLabel._id === label._id,
            );

            return (
              <button
                onClick={() => handleLabel(label, labelCheckboxRef)}
                key={label._id}
                className="flex gap-3 items-center text-sm w-full px-3 pt-1 pb-1 hover:bg-[#e0e0e0]"
              >
                <input
                  defaultChecked={isLabelAdded ? true : false}
                  ref={labelCheckboxRef}
                  type="checkbox"
                />
                <span>{label.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
